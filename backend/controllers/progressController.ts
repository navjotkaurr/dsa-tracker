import { Request } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { UserProgressModel } from "../models/userProgressModel.js";


const getMyProgress = asyncHandler(async(req, res) => {
    const { _id } = req.user;

    const progress = await UserProgressModel.find({
        user: _id,
        isCompleted: true
    })
    .populate('problem');

    res.status(200).json(progress);
})

//@desc    update progress of problem
//@route   PATCH/api/topic/topic:Id/problems/:problemId
//@access  private users only
const markComplete = asyncHandler(async(req, res) => {
    const { problemId } = req.params;
    const { _id } = req.user;

    const progress = await UserProgressModel.findOne({
       user: _id,
       problem: problemId
    });

    if(!progress) {
       const newProgress = await UserProgressModel.create({
        user: _id,
        problem: problemId,
        isCompleted: true
       })
       return res.status(201).json(newProgress);
    }

    progress.isCompleted = !progress.isCompleted;

    await progress.save();
    
    res.status(200).json(progress)

})


export {
    getMyProgress,
    markComplete
}

