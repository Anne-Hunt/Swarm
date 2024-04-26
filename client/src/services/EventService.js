import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventService{
    async getEventsByCreator(userId) {
        const response = await api.get('api/events')
        logger.log('sending response to get events', response.data)
        const meets = response.data.map(eventData => new Event(eventData))
        AppState.events = meets
        const userEvents = meets.filter(meet => meet.creatorId == userId)
        AppState.userEvents = userEvents
    }
    async setActiveEvent(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        logger.log('sending response to get eventById', response.data)
        const eventActive = new Event(response.data)
        AppState.activeEvent = eventActive
    }
    async getEvents(){
        const response = await api.get('api/events')
        logger.log('sending response to get events', response.data)
        const meets = response.data.map(eventData => new Event(eventData))
        AppState.events = meets
    }

    async createEvent(eventData){
        const response = await api.post('api/events', eventData)
        const meet = new Event(response.data)
        AppState.events.push(meet)
        return meet
    }

    async updateEvent(eventId, eventData){
        const response = await api.put(`api/events/${eventId}`, eventData)
        const eventUpdate = new Event(response.data)
        const eventIndex = AppState.events.findIndex(eventId)
        AppState.events.splice(eventIndex, 1, eventUpdate)
    }

    async cancelEvent(eventId){
        const response = await api.put(`api/events/${eventId}`)
        logger.log('sending event to cancel', response.data)
        const eventToCancel = new Event(response.data)
        const eventIndex = AppState.events.findIndex(eventId) 
        AppState.events.splice(eventIndex, 1)
        AppState.events.push(eventToCancel)
    }

    async trashEvent(eventId){
        const response = await api.delete(`api/events/${eventId}`)
        const meetId = response.data.id
        const meet = AppState.events.findIndex(event => event.id == meetId)
        AppState.events.splice(meet, 1)
    }
}

export const eventService = new EventService()