import axiosClient from "../axios-client"


export const fetchAllPetsWhereClient = async(clientId) => {
    try {
        const response = await axiosClient.get(`/retrieve-pet-where-client/${clientId}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
