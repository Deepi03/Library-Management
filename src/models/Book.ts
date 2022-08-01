import mongoose, { Document, Schema, ObjectId } from "mongoose"

export interface BookDocument extends Document{
    isbn: string,
    title: string,
    description: string,
    category: string[],
    onLoan: boolean,
    authors: ObjectId[],
    coverPage: string
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
    category: [
        {
            type: String,
            required: true
        }
    ],      
    onLoan: {
        type: Boolean,
        required: true,
        default: false
    },
    authors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Author'
        }
    ],
    coverPage: {
        type: String,
        required: false
    }
})

const Book = mongoose.model<BookDocument>('Book', bookSchema)
export default Book