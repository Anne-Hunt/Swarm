import { Event } from "./Event.js"
import { Profile } from "./Profile.js"


export class Ticket {
    constructor(data){
        this.id = data.id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.profile = data.account ? new Profile(data.account) : null
        this.event = data.event ? new Event(data.event) : null
    }
}