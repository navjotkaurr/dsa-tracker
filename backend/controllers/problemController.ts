import { Types } from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ProblemModel } from "../models/problemModel.js";
import { TopicModel } from "../models/TopicModel.js";
import redisClient from "../config/redis.js";

// @desc   get a problem
// @route  POST /api/topics/:topicId/problems?page=1&limit=10
// @access public
const getTopicProblems = asyncHandler( async(req, res) => {
    const { topicId } = req.params;
 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit; 

    // const topic = await TopicModel.findById(topicId).populate('problems');
    // console.log('Topic Name')

    const topic = await TopicModel
    .findById(topicId)
    .select('problems')
    
    if(!topic) {
        res.status(404);
        throw new Error('Topic not found');
    }

    const total = topic.problems.length;

    const paginatedIds = topic.problems.slice(skip, skip + limit);

    const problems = await ProblemModel
    .find({ _id: { $in: paginatedIds } })
    .select('title level leetCodeLink youtubeLink articleLink');

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;

     res.status(200).json({
        problems,
        page, 
        limit,
        totalPages,
        hasNextPage,
     });
})

// @desc   add a problem
// @route  POST /api/topics/:topicId/problems
// @access private -> admin
const addProblem = asyncHandler( async(req,res) => {
    const {topicId  } = req.params;

    const { 
        title,
        level,
        youtubeLink,
        leetCodeLink,
        articleLink
     } = req.body;

     const topic = await TopicModel.findById(topicId);
     if(!topic) {
        res.status(404);
        throw new Error('Topic not found')
     }

     const problem = await ProblemModel.create({
        title,
        level,
        youtubeLink: youtubeLink || '',
        leetCodeLink: leetCodeLink || '',
        articleLink: articleLink || '',
     });

     topic.problems.push(problem._id as Types.ObjectId);
     await topic.save();

     await redisClient.del(`api/topics/${topicId}/problems`);
     console.log(`Cache cleared: api/topics/${topicId}/problems`)

     res.status(201).json(problem);

})

// @desc    update a problem
// @route   PUT /api/problems/:problemId
// @access private -> admin
const updateProblem = asyncHandler(async(req, res) => {
    const { problemId } = req.params;
    const { title, level, youtubeLink, leetCodeLink, articleLink } = req.body;

    const problem = await ProblemModel.findByIdAndUpdate(
        problemId, 
        {
            $set: {
                title,
                level,
                youtubeLink: youtubeLink || '',
                leetCodeLink: leetCodeLink || '',
                articleLink: articleLink || ''
            }
        }, 
        {new: true}
    );

    if(!problem) {
        res.status(404);
        throw new Error('Problem not found')
    }
    
    const topic = await TopicModel.findOne({ problems: problemId });

    if(topic) {
        await redisClient.del(`api/topics/${topic._id}/problems`);
        console.log(`Cache cleared: /api/topics/${topic._id}/problems`);

    }
    
    res.status(200).json(problem);

});

// @desc    delete a problem
// @route   DELETE /api/problems/:problemId
// @access private -> admin
const deleteProblem = asyncHandler(async(req,res) => {
    const { problemId } = req.params;

    const problem = await ProblemModel.findByIdAndDelete(problemId);

    if(!problem) {
        res.status(404);
        throw new Error('Problem not found');
    }

    const topic = await TopicModel.findOneAndUpdate(
        { problems: problemId },
        { $pull: {problems: problemId} },
        { new: true }
    );

    if(topic) {
        await redisClient.del(`/api/topics/${topic._id}/problems`);
        console.log(`Cache cleared: /api/topics/${topic._id}/problems`);
    }

    res.status(200).json({
        message: 'Problem deleted successfully'
    });
})

export {
    getTopicProblems,
    addProblem,
    updateProblem,
    deleteProblem
}