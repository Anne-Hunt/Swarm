import { Schema } from "mongoose";


export const CommentSchema = new Schema({
    body: { type: String, required: true },
    creatorId: { type: Schema.ObjectId, required: true },
    eventId: { type: Schema.ObjectId, required: true }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    ref: 'Event',
    foreignField: '_id',
    justOne: true
})