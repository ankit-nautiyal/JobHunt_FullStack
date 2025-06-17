import mongoose from "mongoose";

const companySchema= new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String
    },
    website: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,  //for company's logo URl stored on cloudinarty
        // required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
}, {timestamps: true});

export const Company= mongoose.model('Company', companySchema);
