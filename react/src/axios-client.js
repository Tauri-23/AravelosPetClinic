import axios from "axios";
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});


axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        // Log the error response for debugging
        if (response) {
            console.error('Error status:', response.status);
            console.error('Error data:', response.data);  // Logs the response data
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }

        // Handle specific status codes (401 Unauthorized)
        if (response && response.status === 401) {
            // Handle 401: clear token and log user out
            localStorage.removeItem('ACCESS_TOKEN');
            // Optionally, you can add a redirect here if necessary
        }

        return Promise.reject(error); // Propagate the error for further handling
    }
);

export default axiosClient;
