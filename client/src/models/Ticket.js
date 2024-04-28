import { Event } from "./Event.js"
import { Profile } from "./Profile.js"


export class Ticket {
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.profile = new Profile(data.account)
        this.event = new Event(data.event)
    }
}