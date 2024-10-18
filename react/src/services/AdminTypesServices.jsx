import axiosClient from "../axios-client"

// Fetch pet details by ID
export const fetchAllAdminRoles = async () => {
    try {
        const response = await axiosClient.get(`/get-all-admin-roles`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
