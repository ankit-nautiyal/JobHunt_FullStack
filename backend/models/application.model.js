import mongoose from "mongoose";

const applicationSchema= new mongoose.Schema({
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
        enum: ['Pending','Accepted', 'Rejected'],
        default: 'Pending',
    }, 
}, {timestamps:true});

//This ensures no duplicates can be created, even if logic fails at the application level. A user can apply for a job only once unless rejected
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const Application= mongoose.model("Application", applicationSchema);