import { model, Schema, Types } from "mongoose";
import { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "./userModel.js";
import { DOCUMENT_NAME as PROBLEM_DOCUMENT_NAME } from "./problemModel.js";

export const DOCUMENT_NAME = 'UserProgress';
export const COLLECTION_NAME = 'UserProgress';

export default interface UserProgress extends Document {
    user: Types.ObjectId;
    problem: Types.ObjectId;
    isCompleted: boolean;
}

const progressSchema = new Schema<UserProgress>({
    user: {
        type: Schema.Types.ObjectId,
        ref: USER_DOCUMENT_NAME,
        required: true,
    },
    problem: {
        type: Schema.Types.ObjectId,
        ref: PROBLEM_DOCUMENT_NAME,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false,
})

progressSchema.index(
    {user: 1, problem: 1 },
    { unique: true }
);


export const UserProgressModel = model<UserProgress>(DOCUMENT_NAME, progressSchema, COLLECTION_NAME);