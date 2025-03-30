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

/**
 * 
 * @param {string} clientId - 6 digit client id
 * @param {status} status - Pending | Approved | Completed | Cancelled
 * @returns 
 */
export const fetchAllClientAppointmentsWhereClientIdAndStatus = async(clientId, status) => {
    try {
        const response = await axiosClient.get(`/get-all-appointments-where-clientid-and-status/${clientId}/${status}`);
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

/**
 * 
 * @param {string} petId - 6 digit pet id
 * @param {string} status - Pending | Approved | Completed | Cancelled
 * @returns object[]
 */
export const fetchAllAppointmentsWherePetandStatus = async(petId, status) => {
    try {
        const response = await axiosClient.get(`/get-all-appointments-where-pet-and-status/${petId}/${status}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}



/**
 * 
 * @param {string} appointmentId
 * @returns appointment
 */
export const fetchAppointmentDetails = async(appointmentId) => {
    try {
        const response = await axiosClient.get(`/get-appt-where-id/${appointmentId}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
