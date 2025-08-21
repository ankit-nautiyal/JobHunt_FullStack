import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//APPLY FOR A JOB
export const applyJob = async (req, res) => {
    try {
        const userId = req.id; //from isLoggedIn middleware
        const jobId = req.params.id; //or const { jobId } = req.params; 

        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required.",
                success: false
            })
        }

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        //create new job application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Applied for the job successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in applying for job",
            success: true,
            error: error.message,
        });
    }
}

//GET ALL (APPLICATIONS OF) THE APPLIED JOBS (for the applicant)
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id; //from isAuthenticated middleware
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!applications) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            })
        }

        return res.status(200).json({
            applications,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching applied jobs",
            success: false,
            error: error.message,
        });
    }
}

//GET ALL APPLICANTS WHO HAVE APPLIED FOR A JOB (For the admin/recuiter to see)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error fetching applicants",
            success: true,
            error: error.message,
        });
    }
}

//UPDATE THE  APPLICATION STATUS (admin/recruiter will do this)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;   // admin/recruiter will do this on his admin/recruiter panel via frontend
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        // normalize incoming status to match schema enum ('Pending','Accepted','Rejected')
        const mapping = {
            pending: "Pending",
            accepted: "Accepted",
            rejected: "Rejected"
        };
        const normalized = mapping[String(status).toLowerCase()];

        if (!normalized) {  //...then match with validStatuses value
            return res.status(400).json({
                message: "Invalid status value",
                success: false
            });
        }

        // find the application by application id
        const application = await Application.findByIdAndUpdate(
            applicationId,
            {status: normalized},
            {new: true, runValidators: true}
        ).populate({
            path: "applicant",
            select: "-password"
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job status updated successfully",
            success: true,
            application
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Error updating job status",
            success: false,
            error: error.message,
        });
    }
}