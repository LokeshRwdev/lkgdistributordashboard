import { apiClient } from "../apiClient";

// GSTIN details
export const fetchGstinDetails = async (payload: any) => {
  const response = await apiClient('/secure/distributor/fetch_gstin', 'POST', payload);
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error('Failed to fetch GSTIN details:', response.error);
    return null;
  }
};

// Transaction summary
export const fetchTransactionSummary = async () => {
  const response = await apiClient('/secure/distributor/transaction_summary', 'GET');
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error('Failed to fetch transaction summary:', response.error);
    return null;
  }
};

// Commission summary (non-secure path per collection snippet)
export const fetchCommissionSummary = async () => {
  const response = await apiClient('/distributor/commission-summary', 'GET');
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error('Failed to fetch commission summary:', response.error);
    return null;
  }
};

// Wallet dashboard
export const fetchWalletDashboard = async () => {
  const response = await apiClient('/secure/distributor/wallet-dashboard', 'GET');
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error('Failed to fetch wallet dashboard:', response.error);
    return null;
  }
};

// Public health check
export const fetchHealthStatus = async () => {
  const response = await apiClient('/health', 'GET');
  if (response.success && response.data) {
    return response.data;
  } else {
    console.error('Failed to fetch health status:', response.error);
    return null;
  }
};
