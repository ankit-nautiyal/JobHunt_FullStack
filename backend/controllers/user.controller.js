import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js"
dotenv.config({});

const isProduction = process.env.NODE_ENV === 'production';

//REGISTER
export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        //check if all data is entered in the form or not (server-side validation)
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        };

        const file = req.file;
        let cloudResponse;

        if (req.file) {
            //server-side validation too, for extra security
            if (file.size > 0.5 * 1024 * 1024) { // 500 KB
                return res.status(400).json({ message: 'Image size should be less than 500 KB' });
            }
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: 'jobhunt_project', //optional, all files will be uploaded to this folder in cloudinary
                resource_type: 'image',  //for JPG, PNG, SVG, WebP, etc.
                type: 'upload', // THIS makes it public by default
            });
        }

        const user = await User.findOne({ email }); //email is being used as the primary key

        //check if the user is already registered or not
        if (user) {
            return res.status(409).json({
                message: "User already exists with this email",
                success: false
            })
        };

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);  //(password, salt)

        //create new user
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        //This exact "res" object becomes "res.data" in the frontend.
        return res.status(201).json({
            message: "User registered successfully",
            success: true
        })

    } catch (error) {
        console.log("Register error:", error);

        return res.status(500).json({
            message: error.message || "Something went wrong during registration",
            success: false,
        });
    }
}

//LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        //check if all data is entered in the form or not (server-side validation)
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        };

        let user = await User.findOne({ email });

        //check if the user is already registered or not
        if (!user) {
            return res.status(401).json({
                message: "Account doesn't exist. Please register first.",
                success: false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        //check if the password is correct or not
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            })
        };

        //check if the role is correct or not
        if (role !== user.role) {
            return res.status(403).json({
                message: "Account doesn't exist with the current role",
                success: false
            })
        };

        //genrate tokenData to be sent in payload
        const tokenData = {
            userId: user._id,
            role: user.role
        }

        //create JWT
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,
            role: user.role
        }

        //sending generated token in cookie
        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,   //=1 day (here in ms)
            httpOnly: true,         //for preventing XXS attacks
            secure: isProduction,   // Ensures the cookie is only transmitted over an HTTPS (secure) connection. (Dynamic, Automatically true in production, false in dev)
            sameSite: 'strict'    //to prevent CSRF (Cross-Site Request Forgery) attacks
        }).json({
            message: `Welcome back ${user.fullName.split(" ")[0]}! `, //extract only first name of the user
            user,
            success: true
        })
    } catch (error) {
        console.log("Login error:", error);

        return res.status(500).json({
            message: "Something went wrong during login",
            success: false,
            error: error.message, // Optional: helpful in dev
        });
    }
}

//LOGOUT
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict',
            secure: isProduction //auto-false in dev-mode where https isn't present. cookies(token) won't be trasnmitted if it's http in production
        }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log("Logout error:", error);

        return res.status(500).json({
            message: error.message || "Logout failed. Please try again.",
            success: false,
        });
    }
}

//UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;

        // Get current user's ID from token
        let user = await User.findById(req.id);  //from isAuthenticated middleware

        // Check if another user already has the same email
        const existingUser = await User.findOne({ email, _id: { $ne: req.id } }); // exclude the current user to avoid any conflict

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
                success: false
            });
        }

        let cloudResponse;
        const file = req.file;  //file received on the server/backend
        if (req.file) {
            if (file.mimetype !== 'application/pdf') {  //just to add extra security as server-side/backend validation
                return res.status(400).json({ message: 'Only PDF files are allowed' });
            }

            //server-side validation too, for extra security
            if (file.size > 0.5 * 1024 * 1024) { // 500 KB
                return res.status(400).json({ message: 'File size must be upto 500 KB only' });
            }

            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: 'jobhunt_project', // optional, all files will be uploaded to this folder in cloudinary
                resource_type: 'auto', // auto-detect file type
                type: 'upload', // THIS makes it public by default
            });
        }

        // To receive skills as comma-separated values from the frontend while storing them as an array of strings in the database.
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',').map(skill => skill.trim());  //split skills & convert into an array of CSVs, then trimms whitespaces
        }


        // updating data
        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray


        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log("Error in updating profile:", error);
        return res.status(500).json({
            message: error.message || "Profile update failed.",
            success: false,
        });
    }
}




