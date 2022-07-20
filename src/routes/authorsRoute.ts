import { Router, Response, Request } from "express";
import fileUpload from "../services/multerService";
import authorsController from "../controllers/authorsController";
import authorsMiddleware from "../middlewares/authorsMiddleware";

const authorRoute = Router();
authorRoute.get("", authorsController.getAllAuthors);
authorRoute.post(
  "",
  fileUpload,
  authorsMiddleware.removeEmptySpaces,
  authorsController.createAuthor
);
authorRoute.put(
  "/:authorId",
  fileUpload,
  authorsMiddleware.removeEmptySpaces,
  authorsController.updateAuthor
);
authorRoute.get("/:authorId", authorsController.getSingleAuthor);
authorRoute.delete("/:authorId", authorsController.deleteAuthor);
/* authorRoute.get("/:authorId/books", displayBooksOfAnAuthor, getBooksByAuthor); */

export default authorRoute;
