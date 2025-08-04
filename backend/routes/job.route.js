import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getAllJobs)  // Get all jobs
                 .post(isAuthenticated, postJob)  // Post a new job
// The specific "/admin-jobs" route must come BEFORE the parameter route o/w Express will treat /admin-jobs also as an ID and pass it to the wrong controller i.e. to getJobById
router.route("/admin-jobs").get(isAuthenticated, getAdminJobs);  // GET ALL JOBS CREATED BY ADMIN/RECRUITER
router.route("/:id").get(isAuthenticated, getJobById)   // Get a single job by ID

export default router;

