<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { eventService } from '../services/EventService.js';
import { commentService } from '../services/CommentService.js';
// import { profileService } from '../services/ProfileService.js';
import { ticketService } from '../services/TicketService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { Event } from '../models/Event.js';
import { Comment } from '../models/Comment.js';
import { Profile } from '../models/Profile.js';
import { Ticket } from '../models/Ticket.js';
import { Account } from '../models/Account.js';
import TicketHoldersCard from '../components/TicketHoldersCard.vue';
import { onAuthLoaded } from '@bcwdev/auth0provider-client';
// import { profileService } from '../services/ProfileService.js';
// import EventDetailsCard from '../components/EventDetailsCard.vue';

const activeEvent = computed(()=> AppState.activeEvent)
const eventImg = computed(()=> `url(${AppState.activeEvent?.coverImg})`)
const tickets = computed(()=> (AppState.tickets.filter(ticket => AppState.activeEvent.id == ticket.eventId)))
const comments = computed(()=>AppState.comments)
const userProfile = computed(()=> AppState.account)
const userTicket = computed(()=> AppState.usersTickets.find(userTicket => userTicket.eventId == activeEvent.value.id))
const attending = computed(()=> AppState.usersTickets.find(usersTicket => usersTicket.id == userTicket.value.id))
const soldOutText = `SOLD OUT`
const ticketAvailable = `TICKETS AVAILABLE`
const soldOut = computed(()=> (AppState.activeEvent.capacity == AppState.activeEvent.ticketCount) ? soldOutText : ticketAvailable)
// const soldOutTickets = computed(()=> (if(AppState.activeEvent.capacity == AppState.activeEvent.ticketCount) return soldOutText))
const route = useRoute()

async function getActiveEvent(){
try {
    const eventId = route.params.eventId
    await eventService.setActiveEvent(eventId)
} catch (error) {
    Pop.toast('Unable to load Event', 'error')
    logger.log('Unable to load event', error)
}
}

async function getComments(){
    try {
        const eventId = route.params.eventId
        await commentService.getComments(eventId)
    } catch (error) {
        Pop.toast('Unable to load comments', 'error')
        logger.log('Unable to load comments', error)
    }
}

async function createTicket(){
    try {
        const ticketData = {eventId: route.params.eventId}
        await ticketService.createTicket(ticketData)
    } catch (error) {
        Pop.toast('Unable to load tickets', 'error')
        logger.log('Unable to load tickets', error)
    }
}

// async function getTickets(){
//     try {
//         const eventId = route.params.eventId
//         await ticketService.getTickets(eventId)
//         this.getProfiles()
//     } catch (error) {
//         // Pop.toast('Unable to get tickets', 'error')
//         logger.log('Unable to get tickets', error)
//     }
// }

async function getUserTicket(){
    try {
        await ticketService.getUserTickets()
    } catch (error) {
        // Pop.toast('unable to find ticket', 'error')
        logger.log('unable to find ticket', 'error')
    }
}

async function deleteTicket(){
    try {
        await Pop.confirm('Do you want to cancel your ticket?')
        if (!confirm) return
        await ticketService.deleteTicket()
    } catch (error) {
        Pop.toast('unable to delete ticket', 'error')
        logger.log('Unable to delete ticket', error)
    }
}

    async function cancelEvent(){
        try {
            const confirmation = await Pop.confirm('Do you want to cancel your event?')
            if(!confirmation) return
            const eventId = route.params.eventId
            await eventService.cancelEvent(eventId)
        } catch (error) {
            Pop.toast('unable to cancel', 'error')
        logger.log('Unable to cancel', error)
        }
    }

    async function getAllTickets(){
  try {
      if (AppState.account != null) {
      await ticketService.getAllTickets()}
      else return
  } catch (error) {
      Pop.toast('unable to get all tickets', 'error')
        logger.log('unable to get all tickets', error)
  }
}

onMounted(()=>{
    getActiveEvent()
    getComments()
    // getTickets()
})

onAuthLoaded(()=>{
    getUserTicket()
    getAllTickets()
})
</script>


<template>
    <section class="row justify-content-center mb-2">
        <div v-if="activeEvent" class="col-12 col-md-8">
            <section class="row bgimage rounded">
                <span v-if="activeEvent.isCanceled == true" class=" text-light"><h3><strong>CANCELED</strong></h3></span>
                <span v-else class="text-light fontfix"><h3><strong>{{ soldOut }}</strong></h3></span>
            </section>
            <section class="row mb-2">
                <div class="col-8 p-2">
                    <div class="row justify-content-between mt-2">
                            <div class="col-9"><h2>{{ activeEvent.name }}</h2></div>
                            <div class="col-3 text-center">
                                <span class="rounded-pill bg-primary p-1">{{ activeEvent.type }}</span>
                            </div>
                        <div v-if="activeEvent.creatorId == userProfile?.id" class="col-4">
                            <div class="dropdown">
                                <div class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal fs-1"></i></div>
                                <ul class="dropdown-menu">
                                    <li><button class="dropdown-item"  @click="cancelEvent">Cancel Event</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeEvent" class="row">
                        <div class="col-12">
                            <p> {{ activeEvent.description }}</p>
                            <p><span class="fs-5 pe-2">Date & Time</span>{{ activeEvent.startDate }} at{{ activeEvent.time }}</p>
                            <p><span class="fs-5 pe-2">Location</span>{{ activeEvent.location }}</p>
                        </div>
                    </div>
                    <section class="row bg-primary pt-2 mb-1 rounded">
                        <div v-if="AppState.account">
                            <CommentForm/>
                        </div>
                        <div v-for="comment in comments" :key="comment.id">
                            <CommentCard :comment="comment"/>
                        </div>
                    </section>
                </div>
                <div class="col-4 p-2">
                    <div v-if="AppState.account">
                        <div v-if="userTicket" class="bg-success rounded p-2">
                            <h4>You're going!</h4>
                            <p>Changed your mind?</p>
                            <button class="btn btn-warning" @click="deleteTicket">Cancel</button>
                        </div>
                        <div v-else-if="activeEvent.isCanceled = false || activeEvent.capacity != activeEvent.ticketCount" class="bg-primary rounded p-2">
                            <h4>You know you want to go</h4>
                            <p>Claim your spot!</p>
                            <button class="btn btn-secondary" @click="createTicket">Ticket</button>
                        </div>
                        <!-- <div v-else class="bg-primary rounded p-2">
                            <h4> {{ soldOut }}</h4>
                            <p>You missed out!</p>
                            <button class="btn btn-secondary" disabled>Ticket</button>
                        </div> -->
                    </div>
                    <div>
                        <p>Attendees</p>
                        <div class="bg-primary rounded p-2 container-fluid">
                            <div v-for="ticket in tickets" :key="ticket.id">
                                <div :ticket="ticket">
                                    <img class="ticketHolder rounded-circle border border-2" :src="ticket.profile.picture"
                                    :alt="ticket.profile.name"> <span><strong>{{ ticket.profile.name }}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </section>
    <div>

    </div>
</template>


<style lang="scss" scoped>
.bgimage{
  background-color: black;
  background-image: v-bind(eventImg);
  background-position: center;
  height: 40dvh;
  object-fit: contain;
}

.fontfix{
   text-shadow: 0 5 9 black;
}
</style>