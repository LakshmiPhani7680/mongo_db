import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now().toLocaleString().replace(/:/g, "_") +
      "-" +
      Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
export const upload = multer({ storage: storage });
// export const fileUploadMiddleware = upload.single("file");
// export default fileUploadMiddleware;
