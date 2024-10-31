// api.js
import axios from "axios";



// Function to call the server
export const callServer = async (data) => {
    try {
        const response = await axios.post('https://togather-vercel-rsvp.vercel.app/api/send-message', data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error calling the server:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
