import { z } from "zod";

export const signupSchema = z.object({
    fullName: z
        .string({ required_error: "Full name is required" })
        .trim()
        // .min(3, "Full name must be at least 3 characters")
        .regex(/^[A-Za-z\s]+$/, "Full name can contain only alphabets"),

    email: z.email("Invalid email address"),

    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must be under 64 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
            "Password must include uppercase, lowercase, number & special character"
        ),

    confirmPassword: z.string({ required_error: "Please confirm your password" }),

    role: z
        .string({ required_error: "Role is required" })
        .refine((val) => ['recruiter', 'applicant'].includes(val), {
            message: "Please select a valid role"
        }),

    file: z
        .union([
            z.instanceof(File),
            z.string().max(0),  // Empty string
            z.null()            // Null
        ])
        .refine(
            (file) => !file || file === "" || file === null || file.size <= 0.5 * 1024 * 1024,
            { message: "File must be less than 500 KB" }
        )
        .refine(
            (file) => !file || file === "" || file === null || file.type.startsWith('image/'),
            { message: "Only image files are allowed" }
        )
        .optional(),

}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],  //attach to cofnirmPassword field
    error: "Passwords do not match"
})

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, "Password is required"),
    role: z
        .string({ required_error: "Role is required" })
        .refine((val) => ['recruiter', 'applicant'].includes(val), {
            message: "Please select a valid role"
        }),
})