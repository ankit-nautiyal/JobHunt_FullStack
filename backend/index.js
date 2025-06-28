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
dotenv.config({});

const app= express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,  //so that frontend can send cookie (token) with the requests
}
app.use(cors(corsOptions));

const PORT= process.env.PORT || 3000;

//API Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})
