import mongoose, { Document, Schema, ObjectId } from "mongoose"

export interface BookDocument extends Document{
    isbn: string,
    title: string,
    description: string,
    category: number,
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
    category: {
        type: Schema.Types.Number,
        ref: 'Category'
    },      
    onLoan: {
        type: Boolean,
        required: true
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