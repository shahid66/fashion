import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //set jwt as htto-only cookie

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "strict",
  //   maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  // });
  res.cookie("jwt", token, {
    httpOnly: true, // Secure the cookie (can't be accessed via JavaScript)
    secure: false, // false for development (true for production with HTTPS)
    sameSite: "Lax", // Required for cross-origin requests
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time
    // Ensure the cookie is available for the entire app
  });
};

export { generateToken };
