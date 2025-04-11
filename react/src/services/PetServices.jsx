import axiosClient from "../axios-client"


export const fetchAllPetsWhereClient = async(clientId) => {
    try {
        const response = await axiosClient.get(`/retrieve-pets-where-client/${clientId}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}

export const fetchPetInfoWhereId = async(petId) => {
    try {
        const response = await axiosClient.get(`/retrieve-pet-info-where-id/${petId}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}


export const fetchAllPetTypesWithBreeds = async() => {
    try {
        const response = await axiosClient.get(`/get-all-pet-types-with-breeds`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}