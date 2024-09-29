import axiosClient from "../axios-client"

export const fetchAllMedicines = async() => {
    try {
        const response = await axiosClient.get('/get-all-inventory');
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}