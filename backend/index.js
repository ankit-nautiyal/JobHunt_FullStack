// const express= require('express'); //old way
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import usersRoute from "./routes/users.route.js";
import companiesRoute from"./routes/companies.route.js";
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
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/companies", companiesRoute);


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
})
