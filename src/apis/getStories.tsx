// src/api.tsx
import axios from "axios";

export const getStories = async (email: string | null) => {
  try {
    const response = await axios.get(`https://rishilearn.xyz/story/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
