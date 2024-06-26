import { Schema, VirtualType } from "mongoose";
export const EventSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    description: { type: String, required: true, minLength: 15, maxLength: 1000 },
    coverImg: { type: String, required: true },
    location: { type: String, required: true, minLength: 1, maxLength: 500 },
    capacity: { type: Number, required: true, min: 1, max: 5000 },
    startDate: { type: String, required: true },
    time: { type: String },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital', 'meeting'], default: 'digital' },
    duration: { type: String },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
}, {
    timestamps: true, toJSON: { virtuals: true }
})

EventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    count: true
})