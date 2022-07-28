import mongoose, { Document, Schema, ObjectId } from "mongoose"
import bcrypt from 'bcrypt'

export type UserRole = "guest" | "admin";

export interface UserDocument extends Document{
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
    comparePassword(password:string): Promise<boolean>,
    avatar: string,
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
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 11
    },    
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ["member", "admin"]
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

userSchema.pre<UserDocument>('save', { document: true, query: false }, async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = await bcrypt.hash(this.password, 10)
            return next()
        } catch (e: any) {
            return next(e)
        }
    }
})

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model<UserDocument>('User', userSchema)
export default User
