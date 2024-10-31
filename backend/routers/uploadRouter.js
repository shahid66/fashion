import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; // Corrected file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Only images of type jpg, jpeg, and png are allowed.");
  }
}

// Multer configuration with file filter for validation
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route for multiple image uploads
router.post("/", upload.array("image", 4), (req, res) => {
  // 10 is max count
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  const filePaths = req.files.map((file) =>
    path.posix.join("/uploads/", file.filename)
  );
  res.json({ message: "Images uploaded successfully", image: filePaths });
});

export default router;
