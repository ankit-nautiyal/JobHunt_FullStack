import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router= express.Router();

router.route("/auth/register").post(register);  //Register a new user
router.route("/auth/login").post(login);  //Login a user
router.route("/auth/logout").post(isLoggedIn, logout);  //Logout a user
router.route("/profile").patch(isLoggedIn, updateProfile);  //Update a user profile

export default router;

