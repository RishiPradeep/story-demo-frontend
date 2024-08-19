// src/api.tsx
import axios from "axios";

export const makeSubmit = async (email: string | null) => {
  try {
    const response = await axios.post(
      `http://13.232.39.125:3000/main/${email}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
