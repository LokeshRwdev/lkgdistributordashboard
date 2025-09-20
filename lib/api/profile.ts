import { apiClient } from "../apiClient";

// Fetch distributor profile
export const fetchDistributorProfile = async () => {
	const response = await apiClient('/secure/distributor/profile', 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch distributor profile:', response.error);
		return null;
	}
};

// Fetch user permissions (admin scope)
export const fetchUserPermissions = async () => {
	const response = await apiClient('/admin/get-user-permissions', 'GET');
	if (response.success && response.data) {
		return response.data;
	} else {
		console.error('Failed to fetch user permissions:', response.error);
		return null;
	}
};

