// Import the Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client using the API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Fetches a response from Gemini AI based on the user's prompt.
 * 
 * @param {string} prompt - The user's input text to be sent to Gemini.
 * @returns {Promise<string>} - The generated response text or an error message.
 */
export async function getAIResponse(prompt) {
  try {
    // Load the specific model version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using the model
    const result = await model.generateContent(prompt);

    // Extract and return plain text from the response
    const rawText = result.response.text();
    return rawText;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}
