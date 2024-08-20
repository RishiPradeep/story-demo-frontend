// src/api.tsx
import axios from "axios";

export const createStory = async (
  email: string | null,
  title: string | null,
  story: string | null,
  visibility: string | null,
) => {
  try {
    const response = await axios.post(`https://rishilearn.xyz/story`, {
      email: email,
      title: title,
      story: story,
      visibility: visibility,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
