import { Profile } from "./Profile.js"
import { Event } from "./Event.js"

export class Comment {
    constructor(data){
        this.body = data.body
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.creator = new Profile(data.creator)
        this.event = new Event(data.event)
    }
}