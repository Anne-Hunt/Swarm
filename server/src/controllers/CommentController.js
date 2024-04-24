import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService.js";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
            .delete('/:commentId', this.moderateComment)
    }

    async createComment(request, response, next) {
        try {
            const userInfo = request.userInfo
            const commentData = request.body
            commentData.creatorId = userInfo.id
            const comment = await commentService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async getComments(request, response, next) {
        try {
            const comments = await commentService.getComments()
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const comment = await commentService.deleteComment(commentId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async moderateComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const comment = await commentService.moderateComment(commentId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}