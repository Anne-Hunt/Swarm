import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
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
            const userInfo = request.user
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
            const userInfo = request.user
            const eventData = request.body
            eventData.creatorId = userInfo.id
            const event = await eventService.updateEvent(eventData)
        } catch (error) {
            next(error)
        }
    }
}