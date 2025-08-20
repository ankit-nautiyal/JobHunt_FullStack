import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/").get(getAllJobs)  // Get all jobs (anyone can see all jobs posted on the platform)
router.route("/").post(isAuthenticated, postJob)  // Post a new job (for admin)
router.route("/admin/jobs").get(isAuthenticated, getAdminJobs);  // GET ALL JOBS CREATED BY ADMIN/RECRUITER (for admin)
router.route("/:id").get(getJobById)   // Get a single job by ID

export default router;

