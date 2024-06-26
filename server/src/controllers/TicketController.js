import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";


export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .get('', this.getTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async getTickets(request, response, next) {
        try {
            const tickets = await ticketService.getAllTickets()
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            const accountId = request.userInfo.id
            ticketData.accountId = accountId
            const ticket = await ticketService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userId = request.userInfo.id
            const ticket = await ticketService.deleteTicket(ticketId, userId)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}