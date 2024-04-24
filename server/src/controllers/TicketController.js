import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";


export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(request, response, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const ticket = await ticketService.deleteTicket(ticketId)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}