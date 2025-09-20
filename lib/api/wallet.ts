import { apiClient } from "../apiClient";

// Get a specific wallet balance by balance id
export const fetchWalletBalanceById = async (balanceId: string) => {
	const response = await apiClient(`/secure/distributor/get-wallet-balance/${balanceId}`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch wallet balance by id:', response.error);
		return null;
	}
};

// Get wallet statement for a balance id
export const fetchWalletStatement = async (balanceId: string) => {
	const response = await apiClient(`/secure/distributor/get-wallet-statement/${balanceId}`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch wallet statement:', response.error);
		return null;
	}
};

// Get wallet balance for a user id
export const fetchUserWalletBalance = async (userId: string) => {
	const response = await apiClient(`/secure/distributor/wallet-balance/${userId}`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch user wallet balance:', response.error);
		return null;
	}
};

// List of bank accounts linked to current user
export const fetchYourBanks = async () => {
	const response = await apiClient(`/secure/distributor/your_banks`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch your banks list:', response.error);
		return null;
	}
};


