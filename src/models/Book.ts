import mongoose, { Document, Schema } from "mongoose"

// export type UserRole = 'admin' | 'guest'

export interface BookDocument extends Document{
    isbn: string,
    title: string,
    description: string,
    category: number,
    onLoan: boolean
}

const bookSchema = new Schema<BookDocument>({
    isbn: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },      
    onLoan: {
        type: Boolean,
        required: true
    }
})

const Book = mongoose.model<BookDocument>('Book', bookSchema)
export default Book