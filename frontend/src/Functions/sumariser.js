import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure you have set up an environment variable like VITE_REACT_APP_GEMINI_API
const API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API;

export const Sumariser = async (data) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Summarize the following text: ${data}`;
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error with summarizer:", error);
    throw error; // Propagate the error to be handled by the calling function
  }
};
