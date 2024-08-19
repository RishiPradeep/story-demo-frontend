// src/api.tsx
import axios from "axios";

export const updateStory = async (
  id: string,
  title: string | null,
  story: string | null
) => {
  try {
    const response = await axios.post(
      `http://13.232.39.125:3000/story/update`,
      {
        id: parseInt(id),
        story: story,
        title: title,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
