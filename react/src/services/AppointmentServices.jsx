import axiosClient from "../axios-client"

// Fetch pet details by ID
export const fetchPetsByClientId = async (clientId) => {
    try {
        const response = await axiosClient.get(`/retrieve-pet-where-client/${clientId}`);
        return response.data; // Assuming this returns { id, name }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const fetchAllClientAppointments = async(clientId) => {
    try {
        const response = await axiosClient.get(`/get-all-appointments-where-client/${clientId}`);
        return response.data; //end
        // return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
