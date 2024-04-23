import { Schema } from "mongoose";
export const EventSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 15, maxLength: 1000 },
    coverImg: { type: String, required: true },
    location: { type: String, required: true, minLength: 1, maxLength: 500 },
    capacity: { type: Number, required: true, min: 1, max: 5000 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital', 'meeting'], default: 'digital' },
    duration: { type: '', required: true },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    ticketCount: { type: Schema.ObjectId, required: true, ref: 'Ticket' },
}, {
    timestamps: true, toJSON: { virtuals: true }
})

EventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('comment', {
    localField: 'commentId',
    ref: 'Comment',
    foreignField: '_id'
})