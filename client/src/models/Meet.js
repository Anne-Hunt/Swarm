

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
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.duration = data.duration
        this.creator = data.creator
        this.ticketCount = data.ticketCount
    }
}