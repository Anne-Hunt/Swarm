import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"


class CommentService {
    async createComment(commentData) {
        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator event')
    }

    async getComments() {
        const comments = await dbContext.Comment.find().populate('creator event')
        return comments
    }

    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comment.findOneAndDelete(commentId)
        if (comment.creatorId != userId) throw new Forbidden('Cannot delete comment')
        return `item ${commentId} deleted`
    }

    async moderateComment(commentId) {
        const comment = await dbContext.Comment.findById(commentId)
        const eventId = commentId.eventId
        const event = await eventService.getEventsById(eventId)
        const moderatorId = event.creatorId
        if (comment.creatorId != moderatorId) throw new Forbidden("Cannot moderate comment")
        comment.body = `<p>COMMENT REMOVED BY MODERATOR</p>`
        await comment.save()
        return comment
    }


}

export const commentService = new CommentService()