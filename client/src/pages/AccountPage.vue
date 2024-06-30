<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import { eventService } from '../services/EventService.js';
import { ticketService } from '../services/TicketService.js';

const account = computed(() => AppState.account)
const events = computed(()=> AppState.userEvents)
const tickets = computed(()=> AppState.usersTickets)

const formData = ref({
  name: '',
  picture: '',
  email: ''
})

async function getEventsByCreator(){
  try {
    const userId = AppState.account.id
    await eventService.getEventsByCreator(userId)
  } catch (error) {
    logger.log('Unable to get events', error)
    Pop.toast('Unable to load events', 'error')
  }
}

async function getTickets(){
  try {
        await ticketService.getAllTickets()
        const tickets = AppState.tickets.filter(ticket => AppState.account.id == ticket.accountId)
        AppState.usersTickets = tickets
  } catch (error) {
        // Pop.toast('unable to get all tickets', 'error')
        logger.log('unable to get all tickets', error)
  }
}

async function cancelEvent(eventId){
        try {
            const confirmation = await Pop.confirm('Do you wan to cancel your event?')
            if(!confirmation) return
            await eventService.cancelEvent(eventId)
        } catch (error) {
            Pop.toast('unable to cancel', 'error')
        logger.log('Unable to cancel', error)
        }
    }

async function deleteTicket(ticketId){
    try {
        Pop.confirm('Do you want to cancel your ticket?')
        if (!confirm) return
        await ticketService.deleteTicket(ticketId)
    } catch (error) {
        Pop.toast('unable to delete ticket', 'error')
        logger.log('Unable to delete ticket', error)
    }
}


async function updateAccount(){
  try {
    const accountData = formData.value
    await accountService.updateAccount(accountData)
  }
  catch (error){
    Pop.error("Unable to updated at this time", 'error');
    logger.log("Unable to complete account update", error)
  }
}

onMounted(()=>{
    getTickets()
})
</script>

<template>
  <div class="about text-center">
    <div v-if="account" class="row">
      <div class="col-md-6 col-12 p-2">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded circle" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>

      <div class="row">
        <h2>Your Tickets</h2>
    </div>
    <section class="row p-5">
        <div v-for="ticket in tickets" :key="ticket.id" class="col-6 col-md-4 p-1">
            <div :ticket="ticket">
                <!-- <RouterLink :to="{name: 'Event Details', params: {eventId: ticket.event.id}}"> -->
                    <div class="card rounded">
                        <img class="card-image-top ticketimage rounded-top" :src="ticket.event.coverImg" />
                        <span class="text-light p-1 rounded">{{ ticket.event.type }}</span>
                        <div class="card-body">
                            <div class="row">
                                <div class="card-title"><strong>{{ ticket.event.name }}</strong></div>
                            </div>
                            <div class="card-description">
                                <span>{{ ticket.event.startDate }} -
                                    <small>{{ ticket.event.location }}</small></span><br>
                            </div>
                            <div>
                                <button class="btn btn-primary" @click="deleteTicket(`${ticket.id}`)">Delete
                                    Ticket</button>
                            </div>
                        </div>
                    </div>
                <!-- </RouterLink> -->
            </div>
        </div>
    </section>
    <div class="row">
        <h2>Your Events</h2>
    </div>
    <section class="row p-5">
            <div class="col-md-4 col-6 p-1" v-for="event in events" :key="event.id">
                <div :event="event">
                    <div class="card rounded">
                            <RouterLink :to="{name: 'Event Details', params: {eventId: event.id}}">
                                <img class="card-image-top eventimage rounded-top justify-content-between"
                                    :src="event.coverImg" />
                            <div class="justify-content-between">
                                <span class="bgcolor text-light p-1 rounded">{{ event.type }}</span>
                                <span v-if="event.isCanceled === true" class="bg-danger text-light p-1 rounded">CANCELED</span>
                                <span v-else class="bg-success text-light p-1 rounded">OPEN</span>
                            </div>
                        </RouterLink>
                            <div class="card-body">
                                <div class="row">
                                    <div class="card-title col-10"><strong>{{ event.name }}</strong></div>
                                    <div v-if="event.creatorId == AppState.account?.id" class="text-end col-2">
                                        <span class="dropdown">
                                            <span class="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></span>
                                            <ul class="dropdown-menu">
                                                <li><button class="dropdown-item"
                                                        @click="cancelEvent(`${event.id}`)">Cancel Event</button></li>
                                            </ul>
                                        </span>
                                    </div>
                                    <div v-else></div>
                                </div>
                                <div class="card-subtitle"><span>Hosted by {{ event.creator.name }}</span></div>
                                <div class="card-description">
                                    <span>{{ event.startDate }} - <small>{{ event.location }}</small></span><br>
                                    <span>{{ event.ticketCount }} people are going</span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
    </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
