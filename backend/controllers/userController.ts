import { UserModel } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select('+password +email');

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id.toString());
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await UserModel.create({ name, email, password });

  if (user) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});


// @desc    Get Profile
// @route   Get /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
  const user = await UserModel.findById(req.user!._id).select('+email');

  if(!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })

});


// @desc    update profile
// @route   POST /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await UserModel.findById(req.user!._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  })

}) ;

const uploadProfilePic = asyncHandler(async (req, res) => {
  if(!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  const profilePicUrl = req.file.path;

  const user = await UserModel.findByIdAndUpdate(
    req.user!._id,
    { $set: { profilePicUrl } },
    { new: true }
  ).select('+email')

  if(!user) {
    res.status(404);
    throw new Error('User not found')
  }

  res.status(200).json({
    message: 'Profile picture uploaded',
    profilePicUrl: user.profilePicUrl,
  })

})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadProfilePic
};
