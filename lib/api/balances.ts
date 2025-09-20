import { apiClient } from "../apiClient";

// Upload receipt file (supports FormData or plain payload)
export const uploadReceiptFile = async (payload: any) => {
  const response = await apiClient(
    "/secure/distributor/receipt-file-upload",
    "POST",
    payload
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to upload receipt file:", response.error);
    return null;
  }
};

// Create a fund request
export const createFundRequest = async (payload: any) => {
  const response = await apiClient(
    "/secure/distributor/fund-request",
    "POST",
    payload
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to create fund request:", response.error);
    return null;
  }
};

// Helper to build query string
const buildQuery = (params: Record<string, any>) => {
  const search = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join("&");
  return search ? `?${search}` : "";
};

// Fetch current user's fund requests (my list)
export const fetchMyFundRequests = async ({
  perPage = 10,
  page = 1,
  order = "desc",
  sortBy = "created_at",
}: {
  perPage?: number;
  page?: number;
  order?: string;
  sortBy?: string;
} = {}) => {
  const qs = buildQuery({ per_page: perPage, page, order, sort_by: sortBy });
  const response = await apiClient(
    `/secure/distributor/my-fund-request${qs}`,
    "GET"
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to fetch my fund requests:", response.error);
    return null;
  }
};

// Fetch all fund requests (admin / distributor scope)
export const fetchFundRequests = async ({
  perPage = 10,
  page = 1,
  order = "desc",
  sortBy = "created_at",
}: {
  perPage?: number;
  page?: number;
  order?: string;
  sortBy?: string;
} = {}) => {
  const qs = buildQuery({ per_page: perPage, page, order, sort_by: sortBy });
  const response = await apiClient(
    `/secure/distributor/fund-request${qs}`,
    "GET"
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to fetch fund requests:", response.error);
    return null;
  }
};

// Act on a fund request (approve / reject) – Using PUT instead of PATCH until apiClient supports PATCH
export const actOnFundRequest = async (fundRequestId: string, payload: any) => {
  const response = await apiClient(
    `/secure/distributor/fund-request-action/${fundRequestId}`,
    "PUT",
    payload
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to act on fund request:", response.error);
    return null;
  }
};

// Revoke balance
export const revokeBalance = async (payload: any) => {
  const response = await apiClient(
    "/secure/distributor/revoke-balance",
    "POST",
    payload
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to revoke balance:", response.error);
    return null;
  }
};

// Transfer balance
export const transferBalance = async (payload: any) => {
  const response = await apiClient(
    "/secure/distributor/transfer-balance",
    "POST",
    payload
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to transfer balance:", response.error);
    return null;
  }
};

// Payout
export const payout = async (payload: any) => {
  const response = await apiClient(
    "/secure/distributor/payout",
    "POST",
    payload
  );
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to process payout:", response.error);
    return null;
  }
};
