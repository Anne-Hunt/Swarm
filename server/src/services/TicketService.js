import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TicketService {

    async getAllTickets() {
        const tickets = await dbContext.Ticket.find().populate('event profile')
        return tickets
    }

    async getTicketsByUser(userId) {
        const tickets = await dbContext.Ticket.find({ accountId: userId }).populate('event profile')
        return tickets
    }

    async getTickets(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId }).populate('event profile')
        return tickets
    }

    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile event')
        return ticket
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Ticket.findById(ticketId)
        const accountId = ticket.accountId
        if (!ticket) throw new Error('Unable to delete what is not found')
        if (accountId != userId) throw new Forbidden("Cannot delete ticket")
        await ticket.deleteOne()
        return `ticket ${ticketId} is deleted`
    }
}


export const ticketService = new TicketService()