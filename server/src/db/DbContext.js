import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from '../models/Event.js';
import { CommentSchema } from '../models/Comment.js';
import { TicketSchema } from '../models/Ticket.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Event = mongoose.model('Event', EventSchema);
  Comment = mongoose.model('Comment', CommentSchema);
  Ticket = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
