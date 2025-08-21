// const express= require('express'); //old way
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from"./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
import "./models/application.model.js";
import path from "path";
dotenv.config({});

const app= express();
const _dirname = path.resolve();
const isProduction = process.env.NODE_ENV === 'production';

// ---  MIDDLEWARES ---
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: isProduction ? process.env.PROD_API_BASE_URL : process.env.DEV_API_BASE_URL,
    credentials: true,  //so that frontend can send cookie (token) with the requests
}
app.use(cors(corsOptions));

const PORT= process.env.PORT || 3000;

// ---  API ROUTES ---
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);


// ---  SERVE STATIC ASSETS ---
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// ---  THE SPA CATCH-ALL/WILDCARD ROUTE ---
// Any request that doesn't match an API route above will be sent the index.html file instead of showing a 404 error
app.get('/{*any}', ( _ , res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

// START THE SERVER
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})
