import mongoose, { Document, Schema, ObjectId } from "mongoose"

export type UserRole = "guest" | "admin";

export interface UserDocument extends Document{
    firstname: string,
    lastname: string,
    username: string,
    phone: string,
    email: string,
    password: string,
    // avatar: string,
    role: UserRole
    // onLoan: ObjectId[]
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
    }
    // onLoan: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Book'
    //     }
    // ]
})

const User = mongoose.model<UserDocument>('User', userSchema)
export default User
