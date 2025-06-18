import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/").post(isLoggedIn, postJob)  // Post a new job
                 .get(isLoggedIn, getAllJobs);      // Get all jobs
router.route("/:id").get(isLoggedIn, getJobById)   // Get job by ID
router.route("/admin-jobs").get(isLoggedIn, getAdminJobs);  // get admin jobs

export default router;

