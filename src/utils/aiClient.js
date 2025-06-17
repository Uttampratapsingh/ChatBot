
/**
 * Sends the user's prompt to the backend (Vercel Serverless API)
 * and returns the Gemini AI-generated response.
 *
 * @param {string} prompt - The user's message
 * @returns {Promise<string>} - AI-generated response
 */
export async function getAIResponse(prompt) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const text = await response.text(); // Handle even if it's not valid JSON

    let data = {};
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.warn('Non-JSON response:', text);
    }

    if (response.ok) {
      return data?.text || 'No response received.';
    } else {
      return data?.error || 'Something went wrong.';
    }
  } catch (error) {
    console.error('Client Error:', error);
    return 'Something went wrong. Please try again.';
  }
}
