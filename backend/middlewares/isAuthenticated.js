import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

const isAuthenticated= async (req, res, next) => {
    try {
        const token= req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not logged in",
                success: false
            })
        }

        const decode= jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }

        req.id= decode.userId;  // userId is Now accessible in next middleware or (update) controller 
        req.role = decode.role;  // " "  " "
        next();
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Authentication failed",
            success: false 
        });
    }
}

export default isAuthenticated;