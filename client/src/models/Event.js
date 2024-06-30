import { Profile } from "./Profile.js"

export class Event{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleDateString()
        this.time = new Date(data.time).toTimeString()
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.duration = data.duration
        this.creator = data.creator ? new Profile(data.creator) : null
        this.ticketCount = data.ticketCount
    }

    get DateFixed(){
        const dateStart = new Date(this.startDate).toDateString()
        return dateStart
}
}