"use server";

export async function askGemini(question) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Google Generative AI API key is not configured");
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: question }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error(
        "No valid response from Gemini API: " + JSON.stringify(data)
      );
    }
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error(
      "Failed to generate response: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
