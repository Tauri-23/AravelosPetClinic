import axiosClient from "../axios-client"


export const fetchAllClientsNotDeleted = async() => {
    try {
        const response = await axiosClient.get(`/retrieve-all-clients-not-deleted`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}

export const fetchClientInfoWhereId = async(clientId) => {
    try {
        const response = await axiosClient.get(`/retrieve-client-info-where-id/${clientId}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
