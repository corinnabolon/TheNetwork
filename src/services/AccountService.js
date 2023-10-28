import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Profile } from "../models/Profile.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  // setActiveProfile() {
  //   AppState.activeProfile = new Profile(AppState.account)
  // }

  async editAccount(data) {
    logger.log("Data from the AccountCard", data)
    const res = await api.put("/account", data);
    logger.log("Editing account from the service", res.data)
    AppState.account = new Account(res.data)
  }
}

export const accountService = new AccountService()
