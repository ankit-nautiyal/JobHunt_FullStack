import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        validate: {
            validator: function(v) {
                return v.trim().length > 0; // Prevent empty strings
            },
            message: 'Full name cannot be empty'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, //primary key (unique identifer of a user)
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Basic email validation
            },
            message: 'Please enter a valid email address'
        }
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Exactly 10 digits
            },
            message: 'Phone number must be exactly 10 digits'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
        type: String,
        enum: ['applicant', 'recruiter'],
        required: true,
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],  //Array of strings
        resume: {type: String},           //to store URL of CV stored on cloudinary
        resumeOriginalName: {type: String},       //to store in format like: AnkitNautiyal_Resume.pdf
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},       //reference to 'Company' model
        profilePhoto: {           //to store URL of profile pic stored on cloudinary
            type: String,
            default: ""
        }
    }
}, {timestamps: true});

export const User= mongoose.model('User', userSchema);


