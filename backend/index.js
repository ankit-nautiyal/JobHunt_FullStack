// const express= require('express'); //old way
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
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

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})
