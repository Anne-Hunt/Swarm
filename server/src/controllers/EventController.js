import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.updateEvent)
            .delete('/:eventId', this.cancelEvent)
            .delete('/:eventId', this.deleteEvent)
    }

    async getEvents(request, response, next) {
        try {
            const events = await eventService.getEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventService.getEventsById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createEvent(request, response, next) {
        try {
            const userInfo = request.userInfo
            const eventData = request.body
            eventData.creatorId = userInfo.id
            const event = await eventService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async updateEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const eventData = request.body
            const event = await eventService.updateEvent(eventData, userId, eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await eventService.cancelEvent(eventId, userId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async deleteEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await eventService.deleteEvent(eventId, userId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTickets(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getTickets(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

}