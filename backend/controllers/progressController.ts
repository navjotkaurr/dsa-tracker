import asyncHandler from "../middleware/asyncHandler.js";
import { UserProgressModel } from "../models/userProgressModel.js";

const getMyProgress = asyncHandler(async(req, res) => {
    const { _id } = req.user!;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProblems = await UserProgressModel.countDocuments({
        user: _id,
        isCompleted: true
    })

    const progress = await UserProgressModel.find({
        user: _id,
        isCompleted: true
    })
    .populate({
        path: 'problem',
        select: 'title level'
    })
    .skip(skip)
    .limit(limit);

    const totalPages = Math.ceil(totalProblems / limit);

    res.status(200).json({
        progress,
        page,
        limit,
        totalProblems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    });
})

//@desc    update progress of problem
//@route   PATCH/api/progress/:problemId
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

