import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop.js';
import { api } from './AxiosService'

class AccountService {
  async updateAccount(accountData) {
    try {
      const response = await api.put('/account', accountData)
      AppState.account = new Account(response.data)
    }
    catch (error){
      Pop.error("Unable to update", 'error');
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
