import express from "express";
import {
  getProfile,
  getUsers,
  logInUser,
  logOutUser,
  registerUser,
  updateProfile,
  updateUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);
//User Profile
router.route("/profile").put(protect, updateProfile).get(getProfile);

//admin part
router.route("/").get(getUsers);
router.route("/:id").put(updateUser).put(updateUser).get(getUsers);

export default router;
