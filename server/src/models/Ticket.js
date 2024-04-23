import { Schema } from "mongoose";


export const TicketSchema = new Schema({
    accountId: { type: Schema.ObjectId, required: true },
    eventId: { type: Schema.ObjectId, required: true }
},
    { timestamps: true, toJSON: { virtuals: true } })