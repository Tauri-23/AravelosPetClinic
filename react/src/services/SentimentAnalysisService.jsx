import axiosClient from "../axios-client"


export const fetchAllSentiments = async() => {
    try {
        const response = await axiosClient.get(`/get-sentiments-from-db`);
        const responseData = response.data.map(element => ({
            ...element,
            negative_comments: JSON.parse(element.negative_comments || '[]'),
            neutral_comments: JSON.parse(element.neutral_comments || '[]'),
            positive_comments: JSON.parse(element.positive_comments || '[]'),
        }));
        return responseData;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
