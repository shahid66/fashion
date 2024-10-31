import jwt from "jsonwebtoken";
import User from "./../model/userModel.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  //token
  //token verify
  //user data send to req
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select({ password: 0 });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token failed");
    }
  } else {
    res.status(401);
    throw new Error("No Token");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(" Not authorized as admin");
  }
});

export { admin, protect };
