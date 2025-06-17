import { Company } from "../models/company.model";


//REGISTER COMPANY
export const registerCompany = async (req, res) => {
    try {
        const { companyName, website } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        };

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Such company already exists",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            website: website,
            userId: req.id,  //from isAuthenticated Middleware
        })

        return res.status(201).json({
            message: "Company registered successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
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
    }
}

//GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById({ companyId });
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
    }
}

//UPDATE COMPANY 
export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const file = req.file;
        //cloudinary aega idhar

        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "company information updated",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}



