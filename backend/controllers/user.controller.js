import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config({});


//REGISTER
export const register = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, password, role}= req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            });
        };

        const user= await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email!",
                success: false
            })
        };

        const hashedPassword= await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log (error);
    }
}

//LOGIN
export const login = async (req, res) => {
    try {
        const {email, password, role}= req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                success: false
            });
        };

        let user= await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "User don't exists with this email!",
                success: false
            })
        };

        const isPasswordMatch= await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password!",
                success: false
            })
        };

        //check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does'nt exist with the current role!",
                success: false
            })
        };


        //genrate token
        const tokenData={
            userId: user._id
        }

        const token= await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        user= {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        //storing generated token in cookie
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({   //maxAge=1 day (here in ms)
            message: `Welcome back ${user.fullName}`,
            success: true
        })  

    } catch (error) {
        console.log (error);
    }
}

//LOGOUT
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logge out successfully",
            success: true
        })
    } catch (error) {
        console.log (error);
    }
}

//UPDATE PROFILE
// export const updateProfile = async (req, res) => {
//     try {
        
//     } catch (error) {
//         console.log (error);
//     }
// }

