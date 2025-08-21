import { z } from "zod";

// POST JOB FORM SCHEMA
export const jobPostSchema = z.object({
    jobType: z
        .string({ required_error: "Job type is required" })
        .trim()
        .nonempty("Job type is required"),

    companyId: z
        .string({ required_error: "Company is required" })
        .trim()
        .nonempty("Company is required"),

    title: z
        .string({ required_error: "Job title is required" })
        .trim()
        .nonempty("Job title is required")   // ensures empty string triggers this message
        .min(3, "Job title must have atleast 3 characters")
        .max(60, "Job title cannot exceed 60 characters"),

    requirements: z
        .string({ required_error: "Skills are required" })
        .trim()
        .nonempty("Skills are required")
        .min(3, "Skills must have atleast 3 characters")
        .max(300, "Skills cannot exceed 300 characters"),

    salary: z
        .string({ required_error: "Salary is required" })
        .trim()
        .nonempty("Salary is required")
        .transform(val => Number(val)) // convert to number
        .refine(val => val >= 0, { message: "Please enter valid salary" }),  //allowing unpaid internships too

    location: z
        .string({ required_error: "Location is required" })
        .trim()
        .nonempty("Location is required")
        .min(3, "Location must have atleast 3 characters")
        .max(100, "Location cannot exceed 100 characters"),

    experience: z
        .string({ required_error: "Experience is required" })
        .trim()
        .nonempty("Experience is required")
        .transform(val => Number(val)) // convert to number
        .refine(val => val >= 0, { message: "Please enter valid experience" }),

    positions: z
        .string({ required_error: "Position is required" })
        .trim()
        .nonempty("Position is required")
        .transform(val => Number(val)) // convert to number
        .refine(val => Number.isInteger(val), { message: "Position must be an integer" })
        .refine(val => val >= 1, { message: "There must be at least 1 position" }),

    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .nonempty("Description is required")
        .min(15, "Description must have atleast 15 characters")
        .max(5000, "Description cannot exceed 5000 characters"),

})