import mongoose from "mongoose";

const companySchema= new mongoose.Schema({
    companyName: {
        type: String,
        required: true,  //only companyName mandatory for registering a company, it's primary key too for companies
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        unique: true,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    logo: {
        type: String,  //for company's logo URl stored on cloudinarty
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
}, {timestamps: true});

export const Company= mongoose.model('Company', companySchema);
