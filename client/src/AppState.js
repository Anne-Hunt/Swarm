import { reactive } from 'vue'
import { Ticket } from './models/Ticket.js'
import { Profile } from './models/Profile.js'
import { Event } from './models/Event.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/ 
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

/**@type {Event[]} */
  events: [],
/**@type {Comment[]} */
  comments: [],
  /**@type {Ticket[]} */
  tickets: [],
  /**@type {Event[]} */
  activeEvent: [],
/**@type {Profile[]} */
  activeProfile: [],
  /**@type {Profile[]} */
  profiles: []
})
