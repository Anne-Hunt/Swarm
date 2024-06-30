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




onMounted(()=>{
    getTickets()
    getEventsByCreator()
})
</script>

<template>
  <div class="about text-center">
    <div v-if="account" class="row p-0 m-0">
      <div class="col-12 bg-warning text-light">
        <h1 class="py-2">Welcome {{ account.name }}</h1>
        <img class="rounded-circle profile border border-5 border-light" :src="account.picture" alt="" />
        <div class="text-end text-bottom text-light">
          <i class="mdi mdi-dots-horizontal fs-1 btn text-end text-bottom text-light" data-bs-toggle="modal"
          data-bs-target="#modalId"></i>
        </div>
      </div>

      <div class="row p-3">
        <h2>Your Tickets</h2>
    </div>
    <section class="row px-3">
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
                <UserEventCard :event="event"/>
              </div>
    </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
  <ModalComp><AccountForm></AccountForm></ModalComp>
</template>

<style scoped lang="scss">
img {
  width: 100px;
  height: 100px;
  object-position: center;
  object-fit: cover;
}
</style>
