import express from "express";
import { getCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.route("/").post(isLoggedIn, registerCompany)  // Register a new company
                .get(isLoggedIn, getCompanies);      // Get all companies

router.route("/:id").get(isLoggedIn, getCompanyById)   // Get company by ID
                    .patch(isLoggedIn, updateCompany);  // Update company by ID

export default router;

