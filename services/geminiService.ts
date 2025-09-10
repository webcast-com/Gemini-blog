import { GoogleGenAI } from "@google/genai";
import { NewsResult, NewsSource } from "../types";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogPostContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are an expert blogger. Write a compelling, well-structured, and engaging blog post based on the user's prompt. The tone should be informative yet accessible. Use paragraphs for readability. Do not use markdown formatting.`,
        }
    });

    // Fix: Handle cases where the response text might be empty.
    if (!response.text) {
        return "Error: The AI returned an empty response.";
    }
    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    if (error instanceof Error) {
        return `Error: Failed to generate content. ${error.message}`;
    }
    return "Error: An unknown error occurred while generating content.";
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
      const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
              numberOfImages: 1,
              // outputMimeType: 'image/jpeg', // Removed to use more stable API default (PNG)
              aspectRatio: '16:9',
          },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
          const generatedImage = response.generatedImages[0];
          const base64ImageBytes = generatedImage.image.imageBytes;
          const mimeType = generatedImage.image.mimeType || 'image/png'; // Use dynamic mimeType from response
          return `data:${mimeType};base64,${base64ImageBytes}`;
      } else {
          return "Error: No image was generated.";
      }
  } catch (error) {
      console.error("Error generating image with Gemini API:", error);
      if (error instanceof Error) {
          return `Error: Failed to generate image. ${error.message}`;
      }
      return "Error: An unknown error occurred while generating the image.";
  }
};

export const fetchNews = async (topic: string): Promise<NewsResult> => {
    try {
      // FIX: The `contents` field for a simple text prompt should be a string, not an array of roles and parts.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a concise summary of the latest news about "${topic}".`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
  
      const summary = response.text;
      const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      
      const uniqueSources = new Map<string, NewsSource>();
      rawChunks.forEach((chunk: any) => {
          if (chunk.web && chunk.web.uri && chunk.web.title) {
              if (!uniqueSources.has(chunk.web.uri)) {
                  uniqueSources.set(chunk.web.uri, {
                      uri: chunk.web.uri,
                      title: chunk.web.title,
                  });
              }
          }
      });
  
      const sources = Array.from(uniqueSources.values());
  
      if (!summary && sources.length === 0) {
        return { summary: "Could not find any news on this topic.", sources: [] };
      }
  
      return { summary, sources };
    } catch (error) {
      console.error("Error fetching news with Gemini API:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch news. ${error.message}`);
      }
      throw new Error("An unknown error occurred while fetching news.");
    }
  };