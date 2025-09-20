import { apiClient } from "../apiClient";

export const fetchDistributorList = async () => {
  const response = await apiClient(`/secure/distributor/user-list`, "GET");

  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to fetch distributor list:", response.error);
    return null;
  }
}

// Create a new distributor account
export const createDistributorAccount = async (payload: any) => {
  const response = await apiClient(`/secure/distributor/create-account`, "POST", payload);

  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to create distributor account:", response.error);
    return null;
  }
}

// Fetch users (general users list under distributor scope)
export const fetchDistributorUsers = async () => {
  const response = await apiClient(`/secure/distributor/users`, "GET");

  if (response.success && response.data) {
    return response.data;
  } else {
    console.error("Failed to fetch distributor users:", response.error);
    return null;
  }
}
