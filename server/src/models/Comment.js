import { Schema } from "mongoose";


export const CommentSchema = new Schema({
    body: { type: String, required: true },
    creatorId: { type: Schema.ObjectId, required: true },
    eventId: { type: Schema.ObjectId, required: true }
},
    { timestamps: true, toJSON: { virtuals: true } }
)