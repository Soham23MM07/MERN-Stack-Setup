import multer from "multer";
const storage = multer.memoryStorage();

// File filter (only images)

const fileFilter = (req, file, cb) => {
  // Allow images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  }
  // Allow videos
  else if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  }
  // Allow documents
  else if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "text/plain"
  ) {
    cb(null, true);
  }
  // Allow audio files
  else if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  }
  // Reject other file types
  else {
    cb(
      new Error(
        "Unsupported file type! Only images, videos, documents, and audio files are allowed."
      ),
      false
    );
  }
};

// Multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Multer Upload Video
export const uploadvideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
  },
});
export const uploaddoc = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
  },
});
