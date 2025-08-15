import { z } from "zod";

//SIGNUP FORM SCHEMA
export const signupSchema = z.object({
    fullName: z
        .string({ required_error: "Full name is required" })
        .trim()
        .nonempty("Full name is required") // ensures empty string triggers this message
        .regex(/^[A-Za-z\s]+$/, "Full name can contain only alphabets"),

    email: z.email("Invalid email address"),  //PRIMARY KEY FOR USERS

    phoneNumber: z
        .string({ required_error: "Phone number is required" })  //as using "number()" may not preserve leading zeros
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

    password: z
        .string({ required_error: "Password is required" })
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
            z.instanceof(File),  // must be a file
            z.string().max(0),  // can be an empty string
            z.null()            // can be null
        ])
        .refine(
            (file) => !file || file === "" || file === null || file.size <= 0.5 * 1024 * 1024, //0.5 * 1024 * 1024 = 512000 bytes = 500 KB
            { message: "Image must be less than 500 KB" }
        )
        .refine(
            (file) => !file || file === "" || file === null || file.type.startsWith('image/'),
            { message: "Only image files are allowed" }
        )
        .optional(),

}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],  //attach to confirmPassword field
    error: "Passwords do not match"
})


//================================================================================================


//LOGIN FORM SCHEMA
export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string({ required_error: "Password is required" }),
    role: z
        .string({ required_error: "Role is required" })
        .refine((val) => ['recruiter', 'applicant'].includes(val), {
            message: "Please select a valid role"
        }),
})