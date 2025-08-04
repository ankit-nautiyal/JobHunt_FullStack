import { z } from "zod";

//UPDATE PROFILE FORM SCHEMA
export const updateProfileSchema = z.object({
    fullName: z
        .string({ required_error: "Full name is required" })
        .trim()
        .regex(/^[A-Za-z\s]+$/, "Full name can contain only alphabets"),

    email: z.email("Invalid email address")  //PRIMARY KEY FOR USERS
        .trim(),

    phoneNumber: z
        .string({ required_error: "Phone number is required" })  //as using "number()" may not preserve leading/initial zeros in the number
        .trim()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

    bio: z
        .string()
        .trim()
        .max(100, "Bio must be under 300 characters")
        .optional(),

    skills: z.string().max(300, "Skills must be under 300 characters").optional(),

    file: z
        .union([
            z.instanceof(File),  // must be a file
            z.string().max(0),  // can be an empty string
            z.null()            // can be null
        ])
        .refine(
            (file) => !file || file === "" || file === null || file.size <= 0.5 * 1024 * 1024,  //0.5 * 1024 * 1024 = 512000 bytes = 500 KB
            { message: "File must be less than 500 KB" }
        )
        .refine(
            (file) => !file || file === "" || file === null || file.type === 'application/pdf',
            { message: "Only PDF files are allowed" }
        )
        .optional()
})
