import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentService{
    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        logger.log('sending comment through service', response.data)
        const newComment = new Comment(response.data)
        AppState.comments.push(newComment)
    }
    async getComments(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('sending comment request to api', response.data)
        const comments = response.data.map(commentData => new Comment(commentData))
        AppState.comments = comments
    }

    async deleteComment(commentId){
        const response = await api.delete(`api/comment/${commentId}`)
        logger.log('sending comment to trash', response.data)
        const commentIndex = AppState.comments.findIndex(commentId)
        AppState.comments.splice(commentIndex, 1)
    }
}

export const commentService = new CommentService()