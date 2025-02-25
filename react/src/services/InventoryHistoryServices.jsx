import axiosClient from "../axios-client";

export const fetchAllInventoryHistory = async() => {
    try {
        const response = await axiosClient.get('/get-all-inventory-history');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}