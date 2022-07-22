import mongoose, { Document, Schema, ObjectId } from "mongoose"

export interface CategoryDocument extends Document{
    _id: number,
    name: string,
}

const categorySchema = new Schema<CategoryDocument>({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const Category = mongoose.model<CategoryDocument>('Category', categorySchema)
export default Category