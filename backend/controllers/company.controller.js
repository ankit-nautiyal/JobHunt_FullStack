import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js"


//REGISTER COMPANY
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        //to check if no companyName was provided from frontend 
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        };

        //to check if such company already exists in DB/already registered
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Such company already exists",
                success: false
            })
        }

        company = await Company.create({
            companyName,
            userId: req.id,  //from isAuthenticated Middleware
        })

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Something went wrong during company registration",
            success: false
        });
    }
}

//GET ALL COMPANIES
export const getCompanies = async (req, res) => {
    try {
        const userId = req.id;  //logged in ID of the user- from isAuthenticated Middleware
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "No company found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in getting companies",
            error: error.message,
            success: false,
        });
    }
}

//GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Error in getting company",
            success: false,
        });
    }
}

//UPDATE COMPANY 
export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const file = req.file;  //file received on the server/backend
        let logo; //as "const" is block-scoped in JS

        if (req.file) {
            // File type check
            if (!file.mimetype.startsWith('image/')) {  
                return res.status(400).json({ message: 'Only image files are allowed' });
            }

            // File size check (500 KB)
            if (file.size > 0.5 * 1024 * 1024) { 
                return res.status(400).json({ message: 'File size must be upto 500 KB only' });
            }

            // Upload to Cloudinary
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: 'jobhunt_project', // optional, all files will be uploaded to this folder in cloudinary
                resource_type: 'auto', // auto-detect file type
                type: 'upload', // THIS makes it public by default
            });

            logo = cloudResponse.secure_url; // save the cloudinary url
        }

        const updateData = { companyName, description, website, location }
        if (logo) updateData.logo = logo; //just to make sure logo doesn't updates to undefined in DB in case user doesn't uploads it
        
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true,
            company
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || "Server error",
            success: false
        });
    }
}



