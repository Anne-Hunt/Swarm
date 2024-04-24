import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class TicketService {


    async getTicketsByUser(userId) {
        const tickets = await dbContext.Ticket.find({ userId: creatorId })
        return tickets
    }

    async getTickets(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId })
        return tickets
    }

    async createTicket(eventId, userId) {
        const ticket = await dbContext.Ticket.create()

        return ticket
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await (await dbContext.Ticket.findById(ticketId))
        ticket.populate('creator')
        if (ticket.creatorId != userId) throw new Forbidden("Cannot delete ticket")
        await dbContext.Ticket.deleteOne(ticketId)
        return `ticket ${ticketId} is deleted`
    }
}

export const ticketService = new TicketService()