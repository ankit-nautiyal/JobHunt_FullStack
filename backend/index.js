// const express= require('express'); //old way
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from"./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
dotenv.config({});

const app= express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));

const PORT= process.env.PORT || 3000;

//APIs
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})
