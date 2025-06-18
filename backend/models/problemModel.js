import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    youtubeLink: {
        type: String,
        default: '',
    },
    leetCodeLink: {
        type: String,
        default: ''
    }, 
    articleLink: {
        type: String,
        default: '',
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})


export default problemSchema;