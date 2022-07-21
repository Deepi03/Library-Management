import { CustomError } from "../types/CustomError";
// import { StringDecoder } from "string_decoder";
import User, { UserDocument } from "../models/User";

const getAllUsers = async () => {
    return await User.find()
}

const getUserByUsername = async (username: string) => {
    return await User.findOne({ username: username })
}

const getUserByEmail = async (email: string) => {
    return await User.findOne({ email: email })
}

const getSingleUser = async (userId: string) => {
try {
    const foundUser = await User.findById(userId)
    if (!foundUser) {
        throw new CustomError(404, "User with the provided ID does not exist")
    }
    return foundUser
} catch (error) {
    console.log(error)
    return   
}
}

const createUser = async(user: UserDocument) => {
    return await user.save()
}

const deleteUser = async (userId: string) => {
    const foundUser = await User.findById(userId)
    if (foundUser) {
        return await User.findByIdAndDelete(userId)
    } else {
        throw new CustomError(404, "User not found")
    }
}

const deleteUserByEmail = async (email: string) => {
    const foundUser = await User.findOne({ email: String})
    if (foundUser) {
        return await User.findOneAndDelete({ email: String })
    } else {
        throw new CustomError(404, "User not found")
    }
}

export default {
    getAllUsers,
    getUserByUsername,
    getUserByEmail,
    getSingleUser,
    createUser,
    deleteUser,
    deleteUserByEmail
}
