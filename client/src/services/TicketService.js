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

    async getTicketById(){
        const response = await api.get('api/account/tickets')
        logger.log('getting tickers for user', response.data)
        const tickets = response.data.map(new Ticket(response.data))
        AppState.tickets = tickets
    }

    async createTicket(){
        const response = await api.get('api/tickets')
        logger.log('creating ticket', response.data)
        const ticket = new Ticket(response.data)
        AppState.tickets.push(ticket)
    }
    async deleteTicket(ticketId){
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('getting ticket deleted', response.data)
        const ticketIndex = AppState.tickets.findIndex(ticketId)
        AppState.tickets.splice(ticketIndex, 1)
    }

}

export const ticketService = new TicketService()