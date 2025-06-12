import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, //primary key (unique identifer of a user)
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter'],
        required: true,
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String}, //to store URL of CV stored on cloudinary
        resumeOriginalName: {type: String},  //to store in format like: AnkitNautiyal_Resume.pdf
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},  //reference to 'Company' model
        profilePhoto: {      //to store URL of profile pic stored on cloudinary
            type: String,
            default: ""
        }
    }
}, {timestamps: true});

export const User= mongoose.model('User', userSchema);


//or
// const User= mongoose.model('User', userSchema);
// export default User;