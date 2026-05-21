import { Types } from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import { ProblemModel } from "../models/problemModel.js";
import { TopicModel } from "../models/TopicModel.js";

// @desc   get a problem
// @route  POST /api/topics/:topicId/problems
// @access public
const getTopicProblems = asyncHandler( async(req, res) => {
    const { topicId } = req.params;

    const topic = await TopicModel.findById(topicId).populate('problems');

    if(!topic) {
        res.status(404);
        throw new Error('Topic not found');
    }

    //when user logged in add progess
     res.status(200).json(topic.problems);
})

// @desc   add a problem
// @route  POST /api/topics/:topicId/problems
// @access private -> admin
const addProblem = asyncHandler( async(req,res) => {
    const {topicId  } = req.body;

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
        isCompleted: false,
     });

     topic.problems.push(problem._id as Types.ObjectId);
     await topic.save();

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

    // ---remove the problemId from topic's array


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