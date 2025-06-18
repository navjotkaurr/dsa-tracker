import Topic from "../models/TopicModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc   Create a new topic 
// @route  POST /api/topics
// @access Private (Admin)
const createTopic = asyncHandler(async (req, res) => {
  const { topicName, problems } = req.body;

  const newTopic = new Topic({
    topicName,
    problems,
    user: req.user._id,
  });

  const createdTopic = await newTopic.save();
  res.status(201).json(createdTopic);
});

// @desc   Get all topics 
// @route  GET /api/topics
// @access Public
const getAllTopic = asyncHandler(async (req, res) => {
  const topics = await Topic.find({});
  res.json(topics);
});

// @desc   Toggle completion status of a problem inside a topic
// @route  PUT /api/topics/problem/:id
// @access Private
const markProblemComplete = asyncHandler(async (req, res) => {
  const problemId = req.params.id;

  const topic = await Topic.findOne({ 'problems._id': problemId });

  if (!topic) {
    res.status(404);
    throw new Error('Problem not found');
  }

  const problem = topic.problems.id(problemId);
  problem.isCompleted = !problem.isCompleted;

  await topic.save();
  res.json({ message: 'Problem status updated', problem });
});

export {
  createTopic,
  getAllTopic,
  markProblemComplete,
};
