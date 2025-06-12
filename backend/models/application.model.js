import mongoose, { mongo } from "mongoose";

const appicationSchema= new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type: String,
        enum: ['pending','accepted', 'rejected'],
        default: 'pending',
    }, 
}, {timestamps:true});

export const Application= mongoose.model("Application", appicationSchema);