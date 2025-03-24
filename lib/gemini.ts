import { GoogleGenerativeAI } from "@google/generative-ai";

// Define types for site content
export interface SiteContent {
  html: string;
  css: string;
  js: string;
}

export interface SiteInputs {
  title: string;
  description: string;
  style: string;
  links: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateContent(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
}

export async function generateSiteStructure(userInputs: SiteInputs): Promise<SiteContent> {
  const { title, description, links, style } = userInputs;
  
  const prompt = `
    Create a single-page portfolio website similar to Linktree but more comprehensive.
    Title: ${title}
    Description: ${description}
    Style/Theme: ${style}
    Links to include: ${JSON.stringify(links)}
    
    Please provide the HTML, CSS, and any minimal JavaScript needed for the page.
    Make it responsive, modern, and visually appealing.
    Return the result as a JSON object with separate keys for 'html', 'css', and 'js'.
  `;
  
  const content = await generateContent(prompt);
  
  try {
    // Parse the response to extract HTML, CSS, and JS
    const parsedContent = JSON.parse(content) as SiteContent;
    return parsedContent;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to generate valid site structure");
  }
}