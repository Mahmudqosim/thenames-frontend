"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@progress/kendo-react-buttons";
import { Loader } from "@progress/kendo-react-indicators";
import { Badge } from "@progress/kendo-react-indicators";
import { useGeneratePortfolio, PortfolioContent, PortfolioPrompt } from "@/services/ai";

const portfolioSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  skills: z.array(z.string().min(1, "Skill cannot be empty")).min(1, "Add at least one skill"),
  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      description: z.string().min(10, "Description must be at least 10 characters"),
      technologies: z.array(z.string().min(1, "Technology cannot be empty")).min(1, "Add at least one technology"),
    })
  ).min(1, "Add at least one project"),
  contactInfo: z.object({
    email: z.string().email().optional().or(z.literal("")),
    linkedin: z.string().optional().or(z.literal("")),
    github: z.string().optional().or(z.literal("")),
  }),
});

type FormValues = z.infer<typeof portfolioSchema>;

interface PortfolioGenerationFormProps {
  onGeneration: (content: PortfolioContent) => void;
}

const PortfolioGenerationForm = ({ onGeneration }: PortfolioGenerationFormProps) => {
  const generatePortfolio = useGeneratePortfolio();
  const [newTechnology, setNewTechnology] = useState<string>("");
  const [projectIndex, setProjectIndex] = useState<number>(0);

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      name: "",
      title: "",
      bio: "",
      skills: [""],
      projects: [{ title: "", description: "", technologies: [""] }],
      contactInfo: {
        email: "",
        linkedin: "",
        github: "",
      }
    },
  });

  const { 
    fields: skillFields, 
    append: appendSkill, 
    remove: removeSkill 
  } = useFieldArray({
    control,
    name: "skills"
  });

  const { 
    fields: projectFields, 
    append: appendProject, 
    remove: removeProject 
  } = useFieldArray({
    control,
    name: "projects"
  });

  // For managing technologies in a more user-friendly way
  const {
    fields: technologiesFields,
    append: appendTechnology,
    remove: removeTechnology
  } = useFieldArray({
    control,
    name: `projects.${projectIndex}.technologies`
  });

  const addTechnology = () => {
    if (newTechnology.trim()) {
      appendTechnology(newTechnology.trim());
      setNewTechnology("");
    }
  };

  // Watch current project's technologies to display them as badges
  const currentProjectTechnologies = watch(`projects.${projectIndex}.technologies`);

  const onSubmit = async (data: FormValues) => {
    try {
      // Use the mutation to generate content
      generatePortfolio.mutate(data as PortfolioPrompt, {
        onSuccess: (data) => {
          onGeneration(data);
        },
        onError: (error) => {
          console.error("Generation error:", error);
          alert("Error generating content: " + (error as Error).message);
        }
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Generate Your Portfolio with AI</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              {...register("name")}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input
              {...register("title")}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full Stack Developer"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            {...register("bio")}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Write a short bio about yourself, your experience and what you do..."
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Skills Section with improved UX */}
        <div className="border rounded-md p-4 bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex items-center">
                <div className="relative">
                  <input
                    {...register(`skills.${index}`)}
                    className="w-full p-2 border rounded-md pr-8 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., React"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500"
                    disabled={skillFields.length === 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                {errors.skills?.[index] && (
                  <p className="text-red-500 text-xs">{errors.skills?.[index]?.message}</p>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendSkill("")}
              themeColor="light"
              className="flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Skill
            </Button>
          </div>
          {errors.skills && !Array.isArray(errors.skills) && (
            <p className="text-red-500 text-xs">{errors.skills.message}</p>
          )}
        </div>

        {/* Projects Section with Tabs */}
        <div className="border rounded-md p-4 bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
          
          {/* Project Tabs */}
          <div className="flex border-b mb-4 overflow-x-auto">
            {projectFields.map((field, idx) => (
              <button
                key={field.id}
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  projectIndex === idx
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => setProjectIndex(idx)}
              >
                {watch(`projects.${idx}.title`) || `Project ${idx + 1}`}
              </button>
            ))}
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-600"
              onClick={() => {
                appendProject({ title: "", description: "", technologies: [""] });
                setProjectIndex(projectFields.length);
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>

          {projectFields.map((field, idx) => (
            <div key={field.id} className={idx === projectIndex ? "" : "hidden"}>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Project Title</label>
                  {projectFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        removeProject(idx);
                        setProjectIndex(Math.max(0, projectIndex - 1));
                      }}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Remove Project
                    </button>
                  )}
                </div>
                <input
                  {...register(`projects.${idx}.title`)}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Project Title"
                />
                {errors.projects?.[idx]?.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.projects[idx]?.title?.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register(`projects.${idx}.description`)}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe what this project is about"
                ></textarea>
                {errors.projects?.[idx]?.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.projects[idx]?.description?.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                
                {/* Display current technologies as badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentProjectTechnologies && currentProjectTechnologies.map((tech: string, techIndex: number) => (
                    <div key={techIndex} className="bg-blue-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-blue-800 text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(techIndex)}
                        className="ml-2 text-blue-500 hover:text-red-500"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Add new technology input */}
                <div className="flex">
                  <input
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    className="flex-1 p-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add a technology..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    themeColor="primary"
                    className="rounded-l-none"
                  >
                    Add
                  </Button>
                </div>
                {errors.projects?.[idx]?.technologies && !Array.isArray(errors.projects?.[idx]?.technologies) && (
                  <p className="text-red-500 text-xs mt-1">
                    {(errors.projects?.[idx]?.technologies as { message?: string })?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-md p-4 bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                {...register("contactInfo.email")}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
              {errors.contactInfo?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactInfo.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">LinkedIn</label>
              <input
                {...register("contactInfo.linkedin")}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="LinkedIn URL or username"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">GitHub</label>
              <input
                {...register("contactInfo.github")}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="GitHub username"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            themeColor="primary"
            disabled={generatePortfolio.isPending}
            className="px-6 py-2"
          >
            {generatePortfolio.isPending ? (
              <>
                <Loader size="small" className="mr-2" />
                Generating...
              </>
            ) : (
              "Generate Portfolio"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioGenerationForm;