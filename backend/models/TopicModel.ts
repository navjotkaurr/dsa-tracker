import mongoose, { Document, model, Schema, Types } from "mongoose";
import { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "./userModel.js";
import {DOCUMENT_NAME as PROBLEM_DOCUMENT_NAME} from "./problemModel.js";

export const DOCUMENT_NAME = 'Topic';
export const COLLECTION_NAME = 'topics'

export default interface Topic extends Document {
    topicName: string;
    problems: Types.ObjectId[];
    user: Types.ObjectId;

}

const topicSchema = new Schema<Topic>({
    topicName: {
        type: String,
        required: true,
        trim: true,
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: PROBLEM_DOCUMENT_NAME,
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_DOCUMENT_NAME,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
})

export const TopicModel = model<Topic>(DOCUMENT_NAME, topicSchema, COLLECTION_NAME);

