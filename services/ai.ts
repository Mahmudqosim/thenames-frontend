import { GoogleGenerativeAI } from "@google/generative-ai";
import { useMutation } from '@tanstack/react-query';

// Initialize the Google Generative AI with API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY as string);

// Define the types for better readability
export interface PortfolioPrompt {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  projects: Array<{ 
    title: string; 
    description: string; 
    technologies: string[] 
  }>;
  contactInfo?: { 
    email?: string; 
    linkedin?: string; 
    github?: string 
  };
}

export interface PortfolioContent {
  hero: string;
  about: string;
  skills: string;
  projects: string;
  contact: string;
}

// Create a hook to generate portfolio content
export function useGeneratePortfolio() {
  return useMutation({
    mutationFn: async (userPrompt: PortfolioPrompt): Promise<PortfolioContent> => {
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPrompt),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      return await response.json();
    }
  });
}

export const generatePortfolioContent = async (
  userPrompt: PortfolioPrompt
): Promise<PortfolioContent> => {
  if (!API_KEY) {
    throw new Error("Gemini API key not found in environment variables");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Create a structured prompt based on user input
  const prompt = `
    Create a professional portfolio website content for ${userPrompt.name} who works as ${userPrompt.title}.
    
    Bio information: ${userPrompt.bio}
    
    Skills: ${userPrompt.skills.join(", ")}
    
    Projects:
    ${userPrompt.projects
      .map(
        (project) =>
          `- ${project.title}: ${project.description} (Technologies: ${project.technologies.join(
            ", "
          )})`
      )
      .join("\n")}
    
    Contact info: ${
      userPrompt.contactInfo
        ? `Email: ${userPrompt.contactInfo.email || "Not provided"}, 
           LinkedIn: ${userPrompt.contactInfo.linkedin || "Not provided"}, 
           GitHub: ${userPrompt.contactInfo.github || "Not provided"}`
        : "Not provided"
    }
    
    Please generate HTML content for the following sections:
    1. Hero section - with name, title and a catchy tagline
    2. About section - professional bio based on the information provided
    3. Skills section - listing all skills in a visually appealing way
    4. Projects section - showcasing the projects with descriptions
    5. Contact section - with the provided contact information
    
    Use TailwindCSS classes for styling. Make the design modern and professional.
    Format your response as JSON with sections as keys and HTML content as values.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract the JSON part from the response
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                     text.match(/{[\s\S]*}/);
                     
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from AI response");
    }
    
    let jsonContent;
    try {
      // Try to parse the matched content
      jsonContent = JSON.parse(jsonMatch[0].replace(/```json|```/g, '').trim());
    } catch (e) {
      // If that fails, try to parse the whole text as JSON
      jsonContent = JSON.parse(text);
    }

    return {
      hero: jsonContent.hero || "",
      about: jsonContent.about || "",
      skills: jsonContent.skills || "",
      projects: jsonContent.projects || "",
      contact: jsonContent.contact || "",
    };
  } catch (error) {
    console.error("Error generating portfolio content:", error);
    throw new Error("Failed to generate portfolio content");
  }
};