import axiosClient from "../axios-client"


export const fetchAllStaffs = async() => {
    try {
        const response = await axiosClient.get(`/get-all-staffs`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}

export const fetchAllStaffsWhereStatus = async(status) => {
    try {
        const response = await axiosClient.get(`/get-all-staffs-where-status/${status}`);
        return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
