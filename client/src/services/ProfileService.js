import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Profile } from '../models/Profile.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async setActiveProfile(profileId) {
      const response = await api.get(`profile/${profileId}`)
      const profile = new Profile(response.data)
      AppState.activeProfile = profile
  }
  async getProfiles(eventId) {
      const response = await api.get(`api/events/${eventId}/tickets`)
      logger.log('getting profiles for tickets', response.data)
      const profiles = response.data.profiles.map(profileData => new Profile(profileData))
      AppState.profiles = profiles
  }
  async getProfile() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const profileService = new ProfileService()
