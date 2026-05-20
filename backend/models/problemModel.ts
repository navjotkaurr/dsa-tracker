import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = 'Problem';
export const COLLECTION_NAME = 'problems'

export default interface Problem extends Document {
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

export const ProblemModel = model<Problem>(DOCUMENT_NAME, problemSchema, COLLECTION_NAME);