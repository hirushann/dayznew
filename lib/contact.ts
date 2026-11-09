import { z } from "zod";

/** Shared by the client form (React Hook Form) and the /api/contact Route Handler. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  company: z.string().trim().max(100),
  service: z.string().max(100),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(5000, "Please keep it under 5000 characters"),
  /** Honeypot: hidden from people, bots fill it. */
  website: z.string().max(200),
});

export type ContactInput = z.infer<typeof contactSchema>;
