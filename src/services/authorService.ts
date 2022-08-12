import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/customError";
import Author, { AuthorDocument } from "../models/Author";
import Book from "../models/Book";

const { ObjectId } = require('mongodb')

const getAllAuthors = async () => {
  return await Author.find();
};

const getSingleAuthor = async (authorId: string) => {
  try {
    const foundAuthor = await Author.findById(authorId);
    if (!foundAuthor) {
      throw new CustomError(404, "Author with the provided id is not found");
    }
    return foundAuthor;
  } catch (e) {
    return e;
  }
};
const createAuthor = async (author: AuthorDocument) => {
  return await author.save();
};

const updateAuthor = async (author: AuthorDocument) => {
  const foundAuthor = await Author.findById(author._id);
  if (foundAuthor) {
    return await foundAuthor.updateOne({
      firstname: author.firstname,
      lastname: author.lastname,
      avatar: author.avatar
    });
  } else {
    throw new CustomError(404, "Author not found");
  }
};

const deleteAuthor = async (authorId: string) => {
  const foundAuthor = await Author.findById(authorId);
  if (foundAuthor) {
    return await Author.findByIdAndDelete(authorId);
  } else {
    throw new CustomError(404, "Author not found");
  }
};

const getBooksByAuthor = async (authorId: string) => {
  const foundAuthor = await Author.findById(authorId)
  if (foundAuthor) {
    return await Book.aggregate([
      {
        '$match': {
          'authors': new ObjectId(authorId)
        }
      }, {
        '$project': {
          '_id': 0, 
          '__v': 0
        }
      }, {
        '$group': {
          '_id': '$title', 
          'title': {
            '$first': '$title'
          }, 
          'isbn': {
            '$first': '$isbn'
          }, 
          'description': {
            '$first': '$description'
          }, 
          'category': {
            '$first': '$category'
          }, 
          'authors': {
            '$first': '$authors'
          }, 
          'availableCopies': {
            '$sum': {
              '$cond': [
                {
                  '$eq': [
                    '$onLoan', false
                  ]
                }, 1, 0
              ]
            }
          }
        }
      }, {
        '$project': {
          '_id': 0
        }
      }, {
        '$lookup': {
          'from': 'authors', 
          'localField': 'authors', 
          'foreignField': '_id', 
          'as': 'authors'
        }
      }
    ])
  }
}

export default {
  createAuthor,
  updateAuthor, 
  getAllAuthors,
  getSingleAuthor,
  deleteAuthor,
  getBooksByAuthor
};
