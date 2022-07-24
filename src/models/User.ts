import mongoose, { Document, Schema, ObjectId } from "mongoose"
import { getLeadingCommentRanges } from "typescript";

export type UserRole = "guest" | "admin";

export interface UserDocument extends Document{
    firstname: string,
    lastname: string,
    username: string,
    phone: string,
    email: string,
    password: string,
    // avatar: string,
    role: UserRole,
    loans: Object[],
    loanBasket: string[]
}

const userSchema = new Schema<UserDocument>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 11
    },    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // avatar: {
    //     type: String,
    // },
    role: {
        type: String,
        enum: ["guest", "admin"]
    },
    
    loans: [
        {
            bookId: {
                type: String,
                required: true
            },
            borrowDate: {
                type: String,
                required: true
            },
            returnDate: {
                type: String,
                required: true
            }
        }
    ],

    loanBasket: [
            {
                type: String,
                required: true,
                unique: true
            }
    ]
})

const User = mongoose.model<UserDocument>('User', userSchema)
export default User
