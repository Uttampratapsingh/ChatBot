/**
 * Fetches a text response from Google Gemini AI using the REST API.
 * This version is compatible with frontend (browser) environments.
 *
 * @param {string} prompt - The user's input message to send to Gemini.
 * @returns {Promise<string>} - The AI-generated text response, or an error message.
 */
export async function getAIResponse(prompt) {
  try {
    // Retrieve your Gemini API key from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Send a POST request to Gemini's REST API endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    // Parse the JSON response
    const data = await response.json();

    // Check and return the generated text if it exists
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return generatedText || 'No response received from Gemini.';
  } catch (error) {
    // Log the error and return a friendly fallback message
    console.error('Gemini API error:', error);
    return 'Sorry, something went wrong. Please try again.';
  }
}
