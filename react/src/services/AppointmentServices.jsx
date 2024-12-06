import axiosClient from "../axios-client"


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

export const fetchAllAppointments = async() => {
    try {
        const response = await axiosClient.get('/get-all-appointments');
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}

export const fetchAllAppointmentsWhereStatus = async(status) => {
    try {
        const response = await axiosClient.get(`/get-all-appointments-where-status/${status}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}

export const fetchAppointmentDetails = async(appointmentId) => {
    try {
        const response = await axiosClient.get(`/get-appt-where-id/${appointmentId}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
