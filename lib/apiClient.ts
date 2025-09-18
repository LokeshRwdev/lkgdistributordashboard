import axios, { AxiosError, AxiosResponse } from 'axios';


const axiosInstance = axios.create({
  baseURL: `https://auth-uat.bhugtan.in/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor — attach token ONLY for authorized endpoints
axiosInstance.interceptors.request.use(
  (config) => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem('Token');
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 / 440 redirection
let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    // if ((status === 440 || status === 401) && !isRedirecting) {
    //   console.warn('Session expired. Redirecting to login...');
    //   localStorage.clear();
    //   isRedirecting = true;
    //   const router = useRouter()
    //   setTimeout(() => {
    //     router.push('/');
    //     isRedirecting = false;
    //   }, 300);
    // }

    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errorRes?: any;
  message?:string
}

export async function apiClient<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  payload?: any
): Promise<ApiResponse<T>> {
  try {
    let response: AxiosResponse;
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData;
    const requestConfig = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;

    switch (method) {
      case 'GET':
        response = await axiosInstance.get(endpoint);
        break;
      case 'POST':
        response = await axiosInstance.post(endpoint, payload, requestConfig);
        break;
      case 'PUT':
        response = await axiosInstance.put(endpoint, payload, requestConfig);
        break;
      case 'DELETE':
        response = await axiosInstance.delete(endpoint, { data: payload });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    
    

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    let errorResponseData: any = null;

    if (axios.isAxiosError(error)) {
      errorResponseData = error.response?.data;
      if (errorResponseData && errorResponseData.message) {
        errorMessage = errorResponseData.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
      errorRes: errorResponseData || error // Return the full error response data or the original error
    };
  }
}