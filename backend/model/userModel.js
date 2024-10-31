import mongoose from "mongoose";
import { hashPassword } from "../utils/hashPass.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  const { hash } = await hashPassword(enterPassword, "10");
  return hash;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const { hash } = await hashPassword(this.password, "10");
    this.password = hash;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
