import { NextFunction, Request, Response } from "express";

import { CustomError } from "../types/customError";

import imageService from "../services/imageService";

const getSingleImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { imageId } = req.params;
    const foundImage = await imageService.getSingleImage(imageId);
    if (!foundImage) {
      throw new CustomError(404, "image not found");
    }
    return res.end(foundImage.data);
  } catch (e) {
    next(e);
  }
};

export default {
  getSingleImage
};
