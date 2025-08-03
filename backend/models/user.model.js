import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, //]PRIMARY KEY (unique identifer of a user)
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,  //as trim applies only to strings and //as using "Number" may not preserve leading/initial zeros in the number
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['applicant', 'recruiter'],
        required: true,
    },
    profile: {
        bio: {type: String, trim: true},
        skills: [{type: String}],  //Array of strings
        resume: {type: String},      //to store URL of CV stored on cloudinary
        resumeOriginalName: {type: String},       //to store in format like: AnkitNautiyal.pdf using clouidinary
        company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},       //reference to 'Company' model
        profilePhoto: {           //to store URL of profile pic stored on cloudinary
            type: String,
            default: ""
        }
    }
}, {timestamps: true});


//To apply trim on each individual skill string if it exists
userSchema.pre('save', function (next) {
    if (this.profile && Array.isArray(this.profile.skills)) {
        this.profile.skills = this.profile.skills.map(s => s.trim());
    }
    next();
});

export const User= mongoose.model('User', userSchema);


