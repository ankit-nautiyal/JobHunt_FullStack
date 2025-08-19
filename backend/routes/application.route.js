import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateApplicationStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/:id").post(isAuthenticated, applyJob)  // Apply for a new job
router.route("/").get(isAuthenticated, getAppliedJobs);     // Get all applied jobs for the applicant
router.route("/:id/applicants").get(isAuthenticated, getApplicants);   // Get all applicants of a job (for admin)
router.route("/:id/status").patch(isAuthenticated, updateApplicationStatus);  // Update application status (for admin)

//using verbs like "update" in the API path is not recommended in RESTful APIs pattern, rather nouns/ resources' name shd be used
//verbs are already indicated in HTTP method names

export default router;

