// src/api.tsx
import axios from "axios";

export const getStoryDetails = async (id: any) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/story/single/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
