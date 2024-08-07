import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketService{
    async getTickets(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('getting Tickets in service', response.data)
        const tickets = response.data.map(ticketData => new Ticket(ticketData))
        AppState.eventTickets = tickets
    }

    async getUserTickets() {
        const response = await api.get('account/tickets')
        logger.log('getting Tickets in service', response.data)
        const tickets = response.data.map(ticketData => new Ticket(ticketData))
        AppState.usersTickets = tickets
    }

    async createTicket(ticketData){
        const response = await api.post('api/tickets', ticketData)
        logger.log('creating ticket', response.data)
        const ticket = new Ticket(response.data)
        AppState.tickets.push(ticket)
    }
    async deleteTicket(ticketId){
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('getting ticket deleted', response.data)
        const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketId)
        AppState.tickets.splice(ticketIndex, 1)
        const userIndex = AppState.usersTickets.findIndex(ticket => ticket.id == ticketId)
        AppState.usersTickets.splice(userIndex, 1)
    }

    async getAllTickets(){
        const response = await api.get('api/tickets')
        logger.log('getting all tickets client side', response.data)
        const tickets = response.data.map(ticketData => new Ticket(ticketData))
        AppState.tickets = tickets
    }

}

export const ticketService = new TicketService()