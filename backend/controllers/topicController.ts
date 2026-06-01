import { TopicModel } from "../models/TopicModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { ProblemModel } from "../models/problemModel.js";

// @desc   Create a new topic 
// @route  POST /api/topics
// @access Private (Admin)
const createTopic = asyncHandler(async (req, res) => {
  const { topicName } = req.body;

  const newTopic = new TopicModel({
    topicName,
    problems: [],
  });

  const createdTopic = await newTopic.save();
  res.status(201).json(createdTopic);
});

// @desc   Get all topics 
// @route  GET /api/topics
// @access Public
const getAllTopics = asyncHandler(async (req, res) => {
  const topics = await TopicModel.find({});
  res.json(topics);
});

// @desc   delete a topics 
// @route  DELETE /api/topics/:topicId
// @access private -> admin
const deleteTopic = asyncHandler(async(req, res) => {
  const { topicId } = req.params;

  const topic = await TopicModel.findByIdAndDelete(topicId);

  if(!topic) {
    res.status(404);
    throw new Error('Topic not found');
  }

  res.status(200).json({
    message: 'Topic deleted Successfully'
  });

})

export {
  createTopic,
  getAllTopics,
  deleteTopic
};
