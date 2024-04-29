import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProfileSchema = new Schema(
  {
    id: [{ type: String }],
    name: { type: String, required: true },
    picture: { type: String },
    banned: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)


