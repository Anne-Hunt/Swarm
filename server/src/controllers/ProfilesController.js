import { profileService } from '../services/ProfileService.js'
import { ticketService } from '../services/TicketService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/tickets', this.getTicketsByUser)
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }


  // async getTicketsByUser(request, response, next) {
  //   try {
  //     const userId = request.userInfo.id
  //     const tickets = await ticketService.getTicketsByUser(userId)
  //     response.send(tickets)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async getEventsByCreator(creatorId) {
  //     const events = await dbContext.Event
  //     return events
  // }
}
