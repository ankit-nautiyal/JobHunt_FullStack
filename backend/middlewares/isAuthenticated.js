import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

const isAuthenticated= async (req, res, next) => {
    try {
        const token= req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please log in first",
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

        req.id= decode.userId; 
        req.role = decode.role;  
        next();      // userId & role are Now accessible in next middleware or controller (see routes like---> router.route("/profile").patch(isAuthenticated, updateProfile);) 
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Authentication failed",
            success: false 
        });
    }
}

export default isAuthenticated;