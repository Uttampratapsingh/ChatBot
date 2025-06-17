// src/utils/aiClient.js

/**
 * Calls Google Gemini API from frontend using fetch and API key.
 * Only works in the browser for testing/demo.
 *
 * @param {string} prompt - User's message to send to Gemini.
 * @returns {Promise<string>} - AI response or error message.
 */
export async function getAIResponse(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Optional logging
    console.log('Gemini response:', data);

    // Return response text
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return generatedText || 'No response from Gemini.';
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Something went wrong. Please try again.';
  }
}
