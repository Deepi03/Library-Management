import { Request, Response, NextFunction } from "express";

const removeEmptySpaces = (req: Request, res: Response, next: NextFunction) => {
  req.body.firstname = req.body.firstname.replace(/\s/g, "");
  req.body.lastname = req.body.lastname.replace(/\s/g, "");
  next();
};

export default { removeEmptySpaces };
