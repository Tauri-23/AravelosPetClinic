import axiosClient from "../axios-client"

/**
 * 
 * @param {string} adminId - Optional if you want to exclude the adminId to the rendering if render all leave ignore it
 * @returns 
 */
export const fetchAllAdminsNotDeleted = async(adminId) => {
    try {
        const response = await axiosClient.get(`/retrieve-all-admins-not-deleted/${adminId}`);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
