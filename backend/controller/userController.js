import asyncHandler from "../middleware/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import User from "./../model/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const userData = req.body;
    const inputEmail = userData.email;
    const userExist = await User.findOne({ email: inputEmail });
    if (userExist) {
      res.status(400).json({ message: " User Email already used" });
    } else {
      const user = await User.create(userData);
      if (user) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password === (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // res.status(401).json({ message: "Email or password not match" });
    res.status(401);
    throw new Error("Email or password not match");
  }
});
const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true, // Secure the cookie (can't be accessed via JavaScript)
    secure: false, // false for development (true for production with HTTPS)
    sameSite: "Strict", // Ensure it's not cross-origin
    expires: new Date(0), // Set the expiration date in the past to delete the cookie
    path: "/", // Make sure the cookie is cleared for the entire app
  });
  res.status(200).json({
    message: "Log Out successfully",
  });
});
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updateUser = await user.save();

      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      });
    } else {
      res.status(401).json({ message: "User Not Update" });
    }
  } catch (error) {
    res.status(401);
    throw new Error("User Not Update");
  }
});
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ message: "User Not found" });
    }
  } catch (error) {
    res.status(401);
    throw new Error("User Not Found");
  }
});

//admin part
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User By admin");
});
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404);
    throw new Error("No User Found");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  res.send("single User By admin");
});

export {
  getProfile,
  getUserById,
  getUsers,
  logInUser,
  logOutUser,
  registerUser,
  updateProfile,
  updateUser,
};
