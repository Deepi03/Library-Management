
import { NextFunction, Request, Response } from "express";
import fs from 'fs'
import sharp from 'sharp'
import imageService from "../services/imageService"

import uuid from "uuid4";

import Author  from '../models/Author'
import  {CustomError}  from "../types/customError";
import authorService from "../services/authorService";


const getAllAuthors = async(req: Request, res: Response,next:NextFunction) => {
     const authors = await authorService.getAllAuthors()
     return res.json(authors)
};

const getSingleAuthor = async(req: Request, res: Response) => {
  const authorId = req.params.authorId;
  const foundAuthor = await authorService.getSingleAuthor(authorId) 
  return res.json(foundAuthor)
};

const createAuthor = async(req: Request, res: Response,next: NextFunction) => {
  try{
    if(req.file?.path){
      const dataBuffer = fs.readFileSync(req.file?.path)
      const data = await sharp(dataBuffer).resize(200,200).toBuffer()
      const savedImage = await imageService.createImage(data)
      const avatar = `http://localhost:8080/authorImages/${savedImage._id}`
      const { firstname,lastname,books } = req.body;
      const author = new Author({
          firstname,
          lastname,
          avatar
      })
      const newAuthor = await authorService.createAuthor(author)
      return res.status(201).json(newAuthor);
      } else {
            throw new CustomError(404, 'File cannot be empty')
        }
  }
  catch (e) {
        return next(e)
    }
};

const updateAuthor = async(req:Request,res:Response,next:NextFunction) =>{
   try{
    const  authorId  = req.params.authorId
    if(req.file?.path){
      const dataBuffer = fs.readFileSync(req.file?.path)
      const data = await sharp(dataBuffer).resize(200,200).toBuffer()
      const savedImage = await imageService.createImage(data)
      const avatar = `http://localhost:8080/authorImages/${savedImage._id}`
      const { firstname,lastname,books } = req.body;
      const author = new Author(
        {
           _id : authorId,
          firstname : firstname,
          lastname:lastname,
          avatar: avatar,
        }
      );
     
      const updatedAuthor = await authorService.updateAuthor(author)
      console.log(updatedAuthor)
      return res.status(201).json(updatedAuthor);
    } 
  } catch(e){
     return next(e)
      }
}



const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const  authorId  = req.params.authorId
        await authorService.deleteAuthor(authorId)
        return res.status(204).send('Author get deleted')
    } catch (e) {
        return next(e)
    }
}

/* const getBooksByAuthor = (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  return res.send({
    authorId: authorId,
    message: `Books of author with  ${authorId}`,
    status: 200
  });
}; */

export default { getAllAuthors, getSingleAuthor, createAuthor,updateAuthor,deleteAuthor };
