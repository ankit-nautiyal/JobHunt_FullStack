import { z } from "zod";

//REGISTER COMPANY FORM SCHEMA
export const registerCompanySchema = z.object({
    companyName: z    //PRIMARY KEY FOR COMPANIES
        .string({ required_error: "Company name is required" })
        .trim()
        .nonempty("Company name is required") // ensures empty string triggers this message
        .regex(/^[A-Za-z0-9\s]+$/, "Company name can contain only alphabets & numbers")
        .min(2, "Company name must have atleast 2 characters")
        .max(60, "Company name cannot exceed 60 characters"),
})


//================================================================================================


// UPDATE/SETUP COMPANY FORM SCHEMA
export const updateCompanySchema = z.object({
    companyName: z    //PRIMARY KEY FOR COMPANIES
        .string({ required_error: "Company name is required" })
        .trim()
        .nonempty("Company name is required") // ensures empty string triggers this message
        .regex(/^[A-Za-z0-9\s]+$/, "Company name can contain only alphabets & numbers")
        .min(2, "Company name must have atleast 2 characters")
        .max(60, "Company name cannot exceed 60 characters"),

    description: z
        .string()
        .trim()
        .max(2000, "Description cannot exceed 2000 characters")
        .optional(),

    website: z
        .url("Please enter a valid website URL")
        .max(100, "Website URL cannot exceed 100 characters")
        .optional(),

    location: z
        .string()
        .trim()
        .max(100, "Location cannot exceed 100 characters")
        .optional(),

    file: z
        .union([
            z.instanceof(File),  // must be a file
            z.string().max(0),  // can be an empty string
            z.null()            // can be null
        ])
        .refine(
            (file) => !file || file === "" || file === null || file.size <= 0.5 * 1024 * 1024, //0.5 * 1024 * 1024 = 512000 bytes = 500 KB
            { message: "Logo size must be less than 500 KB" }
        )
        .refine(
            (file) => !file || file === "" || file === null || file.type.startsWith('image/'),
            { message: "Only image files are allowed" }
        )
        .optional()
})