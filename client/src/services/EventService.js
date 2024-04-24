import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventService{

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
        const meet = new Event(response.data)
        AppState.events.find(event => event.id == meet.id)

    }

    async trashEvent(eventId){
        const response = await api.delete(`api/events/${eventId}`)
        const meetId = response.data.id
        const meet = AppState.events.findIndex(event => event.id == meetId)
        AppState.events.splice(meet, 1)
    }
}

export const eventService = new EventService()