import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class EventService {
    async getEventsByCreator(userId) {
        const events = await dbContext.Event.find({ creatorId: userId }).populate('creator ticketCount')
        if (!events) throw new Error('Events not found')
        return events
    }
    async getEvents() {
        const events = await dbContext.Event.find().populate('creator ticketCount')
        return events
    }

    async getEventsById(eventId) {
        const event = await dbContext.Event.findById(eventId).populate('creator ticketCount')
        if (!event) throw new Error('Event Not Found')
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.Event.create(eventData)
        await event.populate('creator ticketCount')
        return event
    }

    async updateEvent(eventData, userId, eventId) {
        const eventUpdate = await dbContext.Event.findById(eventId)
        if (!eventUpdate) throw new Error("ANGRY")
        if (eventUpdate.creatorId != userId) throw new Forbidden("cannot update event")
        if (eventUpdate.isCanceled === true) throw new Error('Cannot edit canceled event')
        eventUpdate.name = eventData.name ?? eventUpdate.name
        eventUpdate.description = eventData.description ?? eventUpdate.description
        eventUpdate.coverImg = eventData.coverImg ?? eventUpdate.coverImg
        eventUpdate.location = eventData.location ?? eventUpdate.location
        eventUpdate.capacity = eventData.capacity ?? eventUpdate.capacity
        eventUpdate.startDate = eventData.startDate ?? eventUpdate.startDate
        eventUpdate.time = eventData.time ?? eventUpdate.time
        eventUpdate.type = eventData.type ?? eventUpdate.type
        eventUpdate.duration = eventData.duration ?? eventUpdate.duration
        eventUpdate.populate('creator ticketCount')
        await eventUpdate.save()
        return eventUpdate
    }

    async cancelEvent(eventId, userId) {
        const eventUpdate = await dbContext.Event.findById(eventId)
        if (eventUpdate.creatorId != userId) throw new Forbidden("cannot cancel event")
        eventUpdate.isCanceled = !eventUpdate.isCanceled
        await eventUpdate.save()
        return eventUpdate
    }

    async deleteEvent(eventId, userId) {
        const eventToDelete = await dbContext.Event.findById(eventId)
        eventToDelete.populate('creator ticketCount')
        if (!eventToDelete) throw new Error('Unable to delete what is not found')
        if (eventToDelete.creatorId != userId) throw new Forbidden('You cannot delete this event')
        await eventToDelete.deleteOne()
        return `event ${eventId} deleted`
    }


}

export const eventService = new EventService()