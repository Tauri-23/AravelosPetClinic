import axiosClient from "../axios-client"


export const fetchAllInventoryCategories = async() => {
    try {
        const response = await axiosClient.get('/get-all-inventory-categories');
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}





export const fetchAllInventoryItems = async() => {
    try {
        const response = await axiosClient.get('/get-all-inventory');
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}