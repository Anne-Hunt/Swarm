import BaseController from "../utils/BaseController.js";

export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
    }
}