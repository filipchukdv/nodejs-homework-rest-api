import multer from "multer";
import path from "path";

const destination = path.resolve("temp");
const limits = { fileSize: 1024 * 1024 * 2 };
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()} - ${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage, limits });

export default upload;
