import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { applyJob, getApplicants, getAppliedJobs, updateJobStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/:id").post(isLoggedIn, applyJob)  // Apply for a new job
router.route("/").get(isLoggedIn, getAppliedJobs);     // Get all applied jobs
router.route("/:id/applicants").get(isLoggedIn, getApplicants);   // Get all applicants of a job
router.route("/:id/status").patch(isLoggedIn, updateJobStatus);  // Update job status

//using verbs like "update" in the API path is not recommended in RESTful APIs pattern, rather nouns/ resources' name shd be used
//verbs are already indicated in HTTP method names

export default router;

