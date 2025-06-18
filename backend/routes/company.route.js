import express from "express";
import { getCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.route("/register").post(isLoggedIn, registerCompany)  // Register a new company
router.route("/").get(isLoggedIn, getCompanies);      // Get all companies
router.route("/:id").get(isLoggedIn, getCompanyById)   // Get company by ID
                    .patch(isLoggedIn, updateCompany);  // Update company by ID

//although using verbs like "update" in the API path is not recommended in RESTful APIs pattern

export default router;

