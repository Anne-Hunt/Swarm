import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentService{
    async getComments(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('sending comment request to api', response.data)
        const comments = response.data.map(commentData => new Comment(commentData))
        AppState.comments = comments
    }

}

export const commentService = new CommentService()