import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

export const uploadprofileimage = async (req, res) => {
  try {
    const file = req.files?.profilepic?.[0]; // ✅ must match the field name in multer config
    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname
    );

    console.log("Result", result.secure_url);

    return res.status(201).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Image upload failed:", error.message);
    return res.status(500).json({ error: "Failed to upload image" });
  }
};
