import { Account } from "./Account.js"


export class Meet{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.time = data.time
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.duration = data.duration
        this.creator = new Account(data.creator)
        this.ticketCount = data.ticketCount
    }
}