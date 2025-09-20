import { apiClient } from "../apiClient";

// Create Virtual Bank Account
export const createVirtualBankAccount = async (payload: any) => {
	const response = await apiClient(`/secure/distributor/create_vba`, 'POST', payload);
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to create virtual bank account:', response.error);
		return null;
	}
};

// List VBAs for a user
export const fetchUserVbaList = async (userId: string) => {
	const response = await apiClient(`/secure/distributor/vba_list/${userId}`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch user VBA list:', response.error);
		return null;
	}
};

// Fetch latest VBAs from server for a user
export const syncUserVbasFromServer = async (userId: string) => {
	const response = await apiClient(`/secure/distributor/get_from_server_vba/${userId}`, 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to sync user VBAs from server:', response.error);
		return null;
	}
};

// Update a VBA (admin scope)
// NOTE: Using PUT instead of PATCH because apiClient currently supports only GET/POST/PUT/DELETE.
// If PATCH semantics are required later, extend apiClient and switch this back.
export const updateVba = async (vbaId: string, payload: any) => {
	const response = await apiClient(`/admin/vba/${vbaId}`, 'PUT', payload);
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to update VBA:', response.error);
		return null;
	}
};

