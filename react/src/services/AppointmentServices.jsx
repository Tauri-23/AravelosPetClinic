import axiosClient from "../axios-client"

// Fetch pet details by ID
export const fetchPetsByClientId = async (clientId) => {
    try {
        console.log(`Fetching pet for client ID: ${clientId}`); // Log the client ID being fetched

        const response = await axiosClient.get(`/retrieve-pet-where-client/${clientId}`);

        console.log('Pet data:', response.data); // Log the fetched pet data

        return response.data; // Assuming this returns { id, name }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const fetchAllClientAppointments = async(clientId) => {
    try {
        const response = await axiosClient.get(`/get-all-appointments-where-client/${clientId}`);
        //added
        const appointments = response.data;

        console.log('Appointments:', appointments); // Log all fetched appointments

        const pets = await fetchPetsByClientId(clientId);
        const petMap = new Map(pets.map(pet => [String(pet.id), pet.name])); // Create a map of pet IDs to names

        const updatedAppointments = appointments.map((appointment) => {
            return {
                ...appointment,
                petName: petMap.get(appointment.pet) || 'Unknown Pet', // Retrieve the pet name using the pet ID
            };
        });
        console.log('Pets:', pets); // Log the pets data
        console.log('Appointments:', appointments); // Log the appointments data

        return updatedAppointments; //end
        // return response.data;
    } catch(error) {
        console.error(error)
        throw error;
    }
}
