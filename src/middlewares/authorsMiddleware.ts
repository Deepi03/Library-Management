import { Request, Response, NextFunction } from "express";

import { CustomError } from "../types/customError";

const removeEmptySpaces = (req: Request, res: Response, next: NextFunction) => {
  req.body.firstname = req.body.firstname.replace(/\s/g, "");
  req.body.lastname = req.body.lastname.replace(/\s/g, "");
  next();
};

const displayBooksOfAnAuthor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.authorId;
  if (Number(authorId) > 0) {
    console.log(`Author  ${authorId} from author middleware`);
  } else {
    throw new CustomError(400, "AuthorId must be greater than 0");
  }

  next();
};

export default { removeEmptySpaces, displayBooksOfAnAuthor };
