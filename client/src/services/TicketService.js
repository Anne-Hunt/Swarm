import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketService{
    async getTickets(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('getting Tickets in service', response.data)
        const tickets = response.data.map(new Ticket(response.data))
        AppState.tickets = tickets
    }

}

export const ticketService = new TicketService()