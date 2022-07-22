import { Router, Response, Request } from "express";
import multerService from "../services/multerService";
import authorsController from "../controllers/authorsController";
import authorsMiddleware from "../middlewares/authorsMiddleware";

const authorRoute = Router();
authorRoute.get("", authorsController.getAllAuthors);
authorRoute.post(
  "",
  multerService.fileUpload,
  authorsMiddleware.removeEmptySpaces,
  authorsController.createAuthor
);
authorRoute.put(
  "/:authorId",
  multerService.fileUpload,
  authorsMiddleware.removeEmptySpaces,
  authorsController.updateAuthor
);
authorRoute.get("/:authorId", authorsController.getSingleAuthor);
authorRoute.delete("/:authorId", authorsController.deleteAuthor);
/* authorRoute.get("/:authorId/books", displayBooksOfAnAuthor, getBooksByAuthor); */

export default authorRoute;
