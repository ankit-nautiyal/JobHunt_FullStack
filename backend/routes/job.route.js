import express from "express";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/").post(isLoggedIn, postJob)  // Post a new job
                 .get(isLoggedIn, getAllJobs);      // Get all jobs
// The specific "/admin-jobs" route must come BEFORE the parameter route o/w Express will treat /admin-jobs also as an ID and pass it to the wrong controller i.e. to getJobById
router.route("/admin-jobs").get(isLoggedIn, getAdminJobs);  // get admin jobs
router.route("/:id").get(isLoggedIn, getJobById)   // Get job by ID


export default router;

