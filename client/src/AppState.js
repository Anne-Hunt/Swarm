import { reactive } from 'vue'
// eslint-disable-next-line no-unused-vars
import { Ticket } from './models/Ticket.js'
// eslint-disable-next-line no-unused-vars
import { Profile } from './models/Profile.js'
// eslint-disable-next-line no-unused-vars
import { Event } from './models/Event.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/ 
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

/**@type {Event[]} */
  events: [],

  comments: [],
  /**@type {Ticket[]} */
  tickets: [],
  /**@type {Ticket[]} */
  usersTickets: [],
  /**@type {Event} */
  activeEvent: null,
  /**@type {Event[]} */
  userEvents: [],
/**@type {Profile[]} */
  activeProfile: [],

  profiles: [],
  /**@type {Ticket[]} */
  eventTickets: []
})
