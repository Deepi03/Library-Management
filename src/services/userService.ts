import { CustomError } from "../types/customError";
import User, { UserDocument } from "../models/User";
import Book from "../models/Book";
import mongoose from "mongoose";

const { ObjectId } = require('mongodb')

const getAllUsers = async () => {
    return await User.find()
}

const getUserByEmail = async (emailId: string): Promise <UserDocument|null|any> => {
    try {
        const foundUser = await User.findOne({email:emailId})
        return foundUser
    } catch (error) {
        return error
    }
}

const getSingleUser = async (userId: string) => {
try {
    const foundUser = await User.findById(userId)
    if (!foundUser) {
        throw new CustomError(404, "User with the provided ID does not exist")
    }
    return foundUser
} catch (error) {
    return error
}
}

const createUser = async(user: UserDocument) => {
    return await user.save()
}

const deleteUserById = async (userId: string) => {
    const foundUser = await User.findById(userId)
    if (foundUser) {
        return await User.findByIdAndDelete(userId)
    } else {
        throw new CustomError(404, "User not found")
    }
}

const deleteUserByEmail = async (email: string) => {
    const foundUser = await User.findOne({ email: email})
    if (foundUser) {
        return await User.findOneAndDelete({ email: email })
    } else {
        throw new CustomError(404, "User not found")
    }
}
    
const addBookToBasket = async (userId: string, bookId: string) => {
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        try {
            const foundUser = await User.findOne({_id:userId})
            if (foundUser) {
                const foundBook = await Book.findOne({_id:bookId})
                // console.log(foundBook)
                if(foundBook?.onLoan === true){
                    throw new CustomError(400, "This copy of the book is already on loan. Please pick another copy")
                } else {
                    await Book.updateOne(
                        {_id:bookId},
                        {$set: {onLoan: true}})
                    await User.updateOne(
                        {_id:userId},
                        {$push: {'loanBasket': new ObjectId(bookId)}}
                        )
                }
            } else {
                throw new CustomError(404, `User not found`)
            }
            await session.commitTransaction()
        } catch (error) {
            console.log(error)
            session.abortTransaction()
        }
    })
}

const deleteBookFromBasket = async (userId: string, bookId: string) => {
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        try {
            const foundUser = await User.findOne({_id:userId})
            if (foundUser) {
                await Book.updateOne(
                    {_id:bookId},
                    {$set: {onLoan: false}})
                await User.updateOne(
                    {_id:userId},
                    {$pull: {'loanBasket': new ObjectId(bookId)}}
                    )
                } else {
                throw new CustomError(404, `User not found`)
            }
            await session.commitTransaction()
        } catch (error) {
            console.log(error)
            session.abortTransaction()
        }
    })
}

const viewUserBasket = async (userId: string) => {
    try {
        const foundUser = await User.findOne({_id:userId})
        if (foundUser) {
            return await User.find({_id:userId})
            .select('firstname lastname loanBasket -_id')
            .populate('loanBasket')
            } else {
            throw new CustomError(404, `User not found`)
        }
    } catch (error) {
        return error
    }
}

const checkoutBasket = async (userId: string) => {
    try {
        const foundUser = await User.findOne({_id:userId})
        const borrowDate = new Date()
        const returnDate = new Date(new Date().getTime() + (21 * 24 * 60 * 60 * 1000)) //+21 days
        if (foundUser) {
            const loanBasket = await User.find({_id:userId}).select('loanBasket -_id')
            const basket = loanBasket[0]
            if(basket.loanBasket.length > 0) {
                const bookBag:any = []
                basket.loanBasket.forEach((bookId: string | any) => {
                    const loanObj = {
                        bookId,
                        borrowDate: borrowDate.toISOString().split('T')[0],
                        returnDate: returnDate.toISOString().split('T')[0]
                    }
                    bookBag.push(loanObj)
                })
                await Book.updateMany(
                    {_id: { $in: basket.loanBasket}},
                    {$set: {onLoan: true}}
                    )
                return User.updateOne(
                    {_id:userId},
                    {
                        $push: {'loans': bookBag},
                        $unset: {'loanBasket': []}
                    })
            } else {
                throw new CustomError(404, `Basket is empty. Add some books to basket first`)    
            }
        } else {
            throw new CustomError(404, `User not found`)
        }
    } catch (error) {
        return error
    }
}


const viewLoans = async(userId: string) => {
    const foundUser = await User.findOne({_id:userId})
    if (foundUser) {
        if (foundUser.loans.length > 0) {
            return await User.find({_id:userId})
            .select('firstname lastname loans -_id')
            .populate('loans.bookId loans.bookId.authors')
        } else {
            return `No books on loan at the moment`
        }
     } else {
        throw new CustomError(404, `User not found`)
    }
}

const returnBook = async (userId: string, bookId: string) => {
    try {
        const foundUser = await User.findOne({_id:userId})
        if (foundUser) {
            await Book.updateOne(
                {_id:bookId},
                {$set: {onLoan: false}}
                )
            return await User.updateOne(
                {_id:userId},
                {$pull: {'loans': {'bookId': bookId}}}
                )
        } else {
            throw new CustomError(404, `User not found`)
        }
    } catch (error) {
        return error
    }
}


export default {
    getAllUsers,
    getUserByEmail,
    getSingleUser,
    createUser,
    deleteUserById,
    deleteUserByEmail,
    addBookToBasket,
    deleteBookFromBasket,
    viewUserBasket,
    checkoutBasket,
    viewLoans,
    returnBook
}
