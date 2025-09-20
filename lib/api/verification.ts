import { apiClient } from "../apiClient";

// Verify IFSC code
export const verifyIfsc = async (payload: any) => {
	const response = await apiClient('/secure/distributor/verify_ifsc', 'POST', payload);
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to verify IFSC:', response.error);
		return null;
	}
};

// Add / create bank account
export const addBankAccount = async (payload: any) => {
	const response = await apiClient('/secure/distributor/bank_accounts', 'POST', payload);
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to add bank account:', response.error);
		return null;
	}
};

// Fetch bank accounts for a user
export const fetchBankAccounts = async (userId: string) => {
	const response = await apiClient(`/secure/distributor/bank_accounts/${userId}`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch bank accounts:', response.error);
		return null;
	}
};

// Delete a bank account
export const deleteBankAccount = async (userId: string, accountId: string) => {
	const response = await apiClient(`/secure/distributor/bank_accounts/${userId}/${accountId}`, 'DELETE');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to delete bank account:', response.error);
		return null;
	}
};

