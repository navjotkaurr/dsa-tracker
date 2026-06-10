import { TopicModel } from "../models/TopicModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { ProblemModel } from "../models/problemModel.js";
import redisClient from "../config/redis.js";

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

  await redisClient.del('api/topics');
  console.log('Cache cleared: /api/topics');

  res.status(201).json(createdTopic);
});

// @desc   Get all topics 
// @route  GET /api/topics?page=1&limit=10
// @access Public
const getAllTopics = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalTopics = await TopicModel.countDocuments();

  const topics = await TopicModel
  .find({})
  .select('topicName')
  .skip(skip)
  .limit(limit);

  const totalPages = Math.ceil(totalTopics / limit);

  res.status(200).json({
    topics,
    page,
    limit,
    totalTopics,
    totalPages,
    hasNextPage: page < totalPages, 
    hasPrevPage: page > 1,
  });
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

  await redisClient.del('api/topics');
  console.log('Cache cleared: /api/topics');

  res.status(200).json({
    message: 'Topic deleted Successfully'
  });

})

export {
  createTopic,
  getAllTopics,
  deleteTopic
};
