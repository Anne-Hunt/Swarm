import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class EventService {
    async getEvents() {
        const events = await dbContext.Event.find().populate('creator tickets ticketCount comments')
        return events
    }

    async getEventsById(eventId) {
        const event = await dbContext.Event.findById(eventId).populate('creator')
        if (!event) throw new Error('Event Not Found')
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.Event.create(eventData)
        await event.populate('creator')
        return event
    }

    async updateEvent(eventData) {
        const event = await this.getEventsById(eventData.id)
        // const updated = await dbContext.Event.updateOne(event, eventData)
        // return updated
    }

    async deleteEvent(eventId, userId) {
        const event = await dbContext.Event.findOneAndDelete(eventId)
        if (event.creatorId != userId) throw new Forbidden('You cannot delete this event')
        return `item ${eventId} deleted`
    }


}

export const eventService = new EventService()