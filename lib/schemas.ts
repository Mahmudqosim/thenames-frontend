import { z } from "zod";

export const LinkSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().optional(),
});

export const SiteStyleSchema = z.enum([
  "minimal",
  "colorful",
  "professional",
  "creative",
  "dark"
]);

export const SiteContentSchema = z.object({
  html: z.string(),
  css: z.string(),
  js: z.string(),
});

export const SiteSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  style: SiteStyleSchema,
  links: z.array(LinkSchema).min(1, "Add at least one link"),
  content: SiteContentSchema.nullable().optional(),
  published: z.boolean().default(false),
  publishedUrl: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Site = z.infer<typeof SiteSchema>;
export type SiteLink = z.infer<typeof LinkSchema>;
export type SiteStyle = z.infer<typeof SiteStyleSchema>;
export type SiteContent = z.infer<typeof SiteContentSchema>;

export const SiteFormSchema = SiteSchema.omit({
  id: true,
  userId: true,
  published: true,
  publishedUrl: true,
  createdAt: true,
  updatedAt: true,
});

export type SiteFormValues = z.infer<typeof SiteFormSchema>;