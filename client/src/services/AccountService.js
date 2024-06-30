import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from '../models/Ticket.js';
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop.js';
import { api } from './AxiosService'

class AccountService {
  async getUserTickets() {
    try {
      const response = await api.get('/account')
      AppState.usersTickets = response.data.map(ticket => new Ticket(ticket))
    }
    catch (error){
      Pop.error("Unable to update", 'error');
      logger.log("unable to get tickets for account", error)
    }  }
  async updateAccount(accountData, accountId) {
    try {
      accountData.id = accountId
      const response = await api.put('/account', accountData)
      AppState.account = new Account(response.data)
    }
    catch (error){
      Pop.error("Unable to update", 'error');
      logger.log("unable to get tickets for account", error)
    }
  }
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const accountService = new AccountService()
