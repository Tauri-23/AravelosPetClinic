import axiosClient from "../axios-client";

export const fetchAllClinicServices = async() => {
    try {
        const response = await axiosClient.get(`/get-all-clinic-services`);
        return response.data; //end
    } catch(error) {
        console.error(error)
        throw error;
    }
}