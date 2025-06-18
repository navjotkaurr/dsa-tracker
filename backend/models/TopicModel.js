import mongoose from "mongoose";
import problemSchema from "./problemModel.js";

const topicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        required: true,
    },
    problems: [problemSchema],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
})

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;