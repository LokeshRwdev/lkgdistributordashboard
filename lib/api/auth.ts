import { AxiosError } from "axios";
import { apiClient, ApiResponse } from "../apiClient";
import { toast } from "sonner";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  user_id: string;
  access_token: string;
  last_login_time?: string;
  device?: string;
  ip?: string;
  permissions?: Record<string, unknown>; // keep flexible for nested permissions
}

export async function login(
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await apiClient("/secure/login", "POST", credentials);
    // store access token when returned
    if (response.data?.access_token) {
      localStorage.setItem("auth_token", response.data.access_token);
    }
    return { success: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      error:
        (axiosError.response?.data as { message?: string })?.message ||
        (error as Error).message ||
        "Login failed",
    };
  }
}

export async function sendPasswordReset(username: string): Promise<ApiResponse<{ message: string }>> {
    try {
        const payload = {
            username,
            type: "both",
            purpose: "FORGOT_PASSWORD"
        };
        const response = await apiClient("/secure/forgot-password",'POST', payload);

        // show success toast with friendly message
        const msg = (response.data && (response.data.message as string)) || "Reset link sent to registered email";
        toast.success(msg);

        return { success: true, data: response.data };
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return {
            success: false,
            error: (axiosError.response?.data as { message?: string })?.message || (error as Error).message || "Failed to send reset link"
        };
    }
}

export async function forgotUsername(mobile: string): Promise<ApiResponse<{ username: string }>> {
    try {
        const payload = {
            mobile,
            purpose: "USERNAME_FORGOT",
            user_type: "DISTRIBUTOR"
        };
        const response = await apiClient("/secure/username-forgot", "POST", payload);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        return {
            success: false,
            error: (axiosError.response?.data as { message?: string })?.message || (error as Error).message || "Failed to retrieve username"
        };
    }
}
