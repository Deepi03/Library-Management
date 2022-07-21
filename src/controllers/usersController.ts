import { NextFunction, Request, Response } from "express";
import fs from "fs";
import sharp from "sharp";

import User, { UserRole } from "../models/User";
import userService from "../services/userService";
import imageService from "../services/imageService";
import { CustomError } from "../types/CustomError";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  return res.json(users);
};

const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const foundUser = await userService.getSingleUser(userId);
  return res.json(foundUser);
};

const getUserByEmail = (req: Request, res: Response) => {
  const userEmail = req.params.userEmail;
  res.send({
    message: `You are at viewing the details of User by email: ${userEmail}`,
    status: 200,
  });
};

const getUserByUsername = (req: Request, res: Response) => {
  const username = req.params.username;
  res.send({
    message: `You are at viewing the details of User by username: ${username}`,
    status: 200,
  });
};

const postUser = (req: Request, res: Response) => {
  res.send(JSON.stringify(req.body));
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // if (req.file?.path) {
      // const dataBuffer = fs.readFileSync(req.file?.path);
      // const data = await sharp(dataBuffer).resize(200, 200).toBuffer();
      // const savedImage = await imageService.createImage(data);
      // const avatar = `http://localhost:8080/images/${savedImage._id}`;
      // const role: UserRole = "guest";
      let { firstname, lastname, username, phone, email, password } = req.body;
      console.log(firstname)

      const user = new User({
        firstname,
        lastname,
        username,
        phone,
        email,
        password,
        // avatar,
        // role,
      });
      const newUser = await userService.createUser(user);
      return res.status(201).json(newUser);
    // } else {
    //     throw new CustomError(404, 'File cannot be empty')
    // }
  } catch (error) {
    return next(error);
  }
};

const deleteUserByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);
      return res.status(204).send("User has been deleted by Id");
    } catch (e) {
      return next(e);
    }
  };

const deleteUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    await userService.deleteUser(username);
    return res.status(204).send("User has been deleted by username");
  } catch (e) {
    return res.send(e);
  }
};

const deleteUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;
    await userService.deleteUserByEmail(email);
    return res.status(204).send("User has been deleted by email");
  } catch (e) {
    return next(e);
  }
};

export default {
  getAllUsers,
  getSingleUser,
  getUserByEmail,
  getUserByUsername,
  postUser,
  createUser,
  deleteUserByUsername,
  deleteUserByEmail,
  deleteUserByUserId
};
