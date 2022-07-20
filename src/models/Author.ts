import mongoose, { Document, Schema } from "mongoose";

export interface AuthorDocument extends Document {
  firstname: string;
  lastname: string;
  avatar: string;
}

const authorSchema = new Schema<AuthorDocument>({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

// create Authors collection in mongodb
const Author = mongoose.model<AuthorDocument>("Author", authorSchema);
export default Author;
