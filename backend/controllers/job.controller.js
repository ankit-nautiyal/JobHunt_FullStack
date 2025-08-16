import { Job } from "../models/job.model.js";

//POST JOB (for admin/recruiter)
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, positions, companyId } = req.body;
        const userId = req.id;  //from isLoggedIn middleware

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !positions || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience,
            positions,
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "New job posted successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//GET ALL JOBS (for applicants)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1})  //latest posted job will come first

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//GET A SINGLE JOB BY ID (for applicants)
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
    
        const job = await Job.findById(jobId).populate({path: "applications"}).populate({path: "company"});

        if (!job) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//GET ALL JOBS CREATED BY ADMIN/RECRUITER
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; //from isLoggedIn middleware
    
        const jobs = await Job.find({created_by: adminId}).populate({path: "company"}).sort({createdAt: -1});  //latest posted job will come first

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}