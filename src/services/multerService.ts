import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

//reads from form input and store it in above storage
/** Author Avatar **/
const fileUpload = multer({ storage }).single("avatar");
/** Book Coverpage **/
const coverPageUpload = multer({ storage }).single("coverPage")

export default {
  fileUpload,
  coverPageUpload
}
