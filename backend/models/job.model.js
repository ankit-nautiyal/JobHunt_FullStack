import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    requirements: [{   //skills (array of strings)
        type: String,
        required: true,
    }],
    salary: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        required: true,
        trim: true
    },
    positions: {
        type: Number,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
            // required: true,
        }
    ]
}, {timestamps: true});

//To apply trim on each individual requirement string if it exists
jobSchema.pre('save', function (next) {
    if (Array.isArray(this.requirements)) {
        this.requirements = this.requirements.map(skill => skill.trim());
    }
    next();
});


export const Job= mongoose.model('Job', jobSchema);
