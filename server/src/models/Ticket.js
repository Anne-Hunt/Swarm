import { Schema } from "mongoose";


export const TicketSchema = new Schema({
    accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    eventId: { type: Schema.ObjectId, required: true, ref: 'Event' }
},
    { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    ref: 'Event',
    foreignField: '_id',
    justOne: true
})