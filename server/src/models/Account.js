import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    banned: { type: Boolean, default: false },
    bannedBy: { type: [] }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)


