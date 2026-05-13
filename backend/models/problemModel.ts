import mongoose, { model, Schema } from "mongoose";

const MODEL_NAME = 'Problem';

interface Problem {
    title: string;
    youtubeLink?: string;
    leetCodeLink?: string;
    articleLink?: string;
    level: 'Easy' | 'Medium' | 'Hard';
    isCompleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const problemSchema =  new Schema<Problem>({
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

const ProblemModel = model<Problem>(MODEL_NAME, problemSchema);

export default ProblemModel;