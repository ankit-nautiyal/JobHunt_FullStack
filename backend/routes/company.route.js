import express from "express";
import { getCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany)  // Register a new company
router.route("/").get(isAuthenticated, getCompanies);      // Get all companies
router.route("/:id").get(isAuthenticated, getCompanyById)   // Get company by ID
                    .patch(isAuthenticated, updateCompany);  // Update company by ID

//although using verbs like "update" in the API path is not recommended in RESTful APIs pattern

export default router;

