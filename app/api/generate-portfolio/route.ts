import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 }
    );
  }

  try {
    const userPrompt = await request.json();
    
    // Initialize the generative AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a structured prompt based on user input
    const prompt = `
    Create a visually stunning, professional portfolio website content for ${userPrompt.name} who works as ${userPrompt.title}.
    
    Bio information: ${userPrompt.bio}
    
    Skills: ${userPrompt.skills.join(", ")}
    
    Projects:
    ${userPrompt.projects
      .map(
        (project: { title: string; description: string; technologies: string[] }) =>
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
    
    1. Hero section - Create a modern, eye-catching hero section with:
       - An animated introduction (using CSS animations)
       - The person's name with creative typography
       - Their professional title with a typing effect
       - A brief, impactful tagline
       - A call-to-action button
       - Subtle parallax or scroll effects
    
    2. About section - Design an engaging about section with:
       - Professional bio presented in a visually interesting way
       - Split layout with potential for an image placeholder
       - Animated statistics or experience highlights
       - Subtle reveal animations on scroll
    
    3. Skills section - Create a visually appealing skills showcase with:
       - Modern skill bars or interactive skill cards
       - Animated progress indicators
       - Organized categories (if applicable)
       - Visual icons representing each skill area
       - Hover effects for interactivity
    
    4. Projects section - Design a portfolio showcase with:
       - Modern card layouts with hover effects
       - Featured project highlights
       - Interactive project cards that expand or flip on interaction
       - Visual indicators for the technologies used
       - Animated transitions between projects
    
    5. Contact section - Create an inviting contact area with:
       - Stylish contact form layout (visual only)
       - Animated social media icons
       - Interactive elements
       - Map integration placeholder
       - Creative call-to-action
    
    Use modern TailwindCSS classes for styling with the following requirements:
    - Implement subtle, professional animations (fades, slides, reveals)
    - Use a cohesive, professional color scheme
    - Include responsive design classes
    - Add hover effects on interactive elements
    - Implement smooth transitions
    - Use modern glassmorphism or neumorphism design elements where appropriate
    - Include accessibility attributes
    
    Prioritize clean, semantic HTML structure with modern design practices.
    Ensure all animations are tasteful and enhance the user experience, not distract from it.
    
    Format your response as a valid JSON object with "hero", "about", "skills", "projects", and "contact" as keys,
    and the corresponding HTML content as string values. Do not wrap the JSON in markdown code blocks, code fences, or any other formatting.
  `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Improved JSON extraction logic
    let jsonContent;
    
    try {
      // First attempt: Try to parse the entire response as JSON directly
      jsonContent = JSON.parse(text);
    } catch (e) {
      console.log("First parsing attempt failed, trying to extract JSON from markdown");
      
      try {
        // Second attempt: Look for JSON between code blocks
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          jsonContent = JSON.parse(jsonMatch[1].trim());
        } else {
          // Third attempt: Look for anything that looks like a JSON object
          const potentialJson = text.match(/{[\s\S]*}/);
          if (potentialJson) {
            jsonContent = JSON.parse(potentialJson[0]);
          } else {
            throw new Error("No valid JSON found in response");
          }
        }
      } catch (innerError) {
        console.error("JSON extraction failed:", innerError);
        
        // Fourth attempt: Create a structured object from the raw text if all else fails
        // This is a fallback to extract JSON-like content even if formatting is incorrect
        const heroMatch = text.match(/"hero"\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        const aboutMatch = text.match(/"about"\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        const skillsMatch = text.match(/"skills"\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        const projectsMatch = text.match(/"projects"\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        const contactMatch = text.match(/"contact"\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
        
        if (heroMatch || aboutMatch || skillsMatch || projectsMatch || contactMatch) {
          jsonContent = {
            hero: heroMatch ? JSON.parse(heroMatch[1]) : "",
            about: aboutMatch ? JSON.parse(aboutMatch[1]) : "",
            skills: skillsMatch ? JSON.parse(skillsMatch[1]) : "",
            projects: projectsMatch ? JSON.parse(projectsMatch[1]) : "",
            contact: contactMatch ? JSON.parse(contactMatch[1]) : "",
          };
        } else {
          throw new Error("Could not extract content from AI response");
        }
      }
    }
    
    if (!jsonContent) {
      return NextResponse.json(
        { error: "Could not parse content from AI response" },
        { status: 500 }
      );
    }

    // Ensure all expected fields are present
    const response = {
      hero: jsonContent.hero || "",
      about: jsonContent.about || "",
      skills: jsonContent.skills || "",
      projects: jsonContent.projects || "",
      contact: jsonContent.contact || "",
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error("Error generating portfolio content:", error);
    
    // Return a more descriptive error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        error: "Failed to generate portfolio content", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}