<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
import { eventService } from '../services/EventService.js';
import { ticketService } from '../services/TicketService.js';
import UserTicketCard from '../components/UserTicketCard.vue';

const account = computed(() => AppState.account)
const events = computed(()=> AppState.userEvents)
const tickets = computed(()=> AppState.usersTickets)


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

async function getUserTickets(){
  try {
    await accountService.getUserTickets()
  }
  catch (error){
    Pop.toast("Unable to get tickets", 'error');
    logger.log("unable to get user tickets", error)
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
      <div class="col-12 bg-warning text-light shadow">
        <h1 class="py-2 fontfix">Welcome {{ account.name }}</h1>
        <img class="rounded-circle profile border border-5 border-light shadow" :src="account.picture" alt="" />
        <div class="text-end text-bottom text-light">
          <i class="mdi mdi-dots-horizontal fs-1 btn text-end text-bottom text-light fontfix" data-bs-toggle="modal"
          data-bs-target="#modalId"></i>
        </div>
      </div>

      <div class="row p-3">
        <h2>Your Tickets</h2>
    </div>
    <section class="row px-3">
        <div v-for="ticket in tickets" :key="ticket.id" class="col-6 col-md-4 p-1">
            <UserTicketCard :ticket="ticket"/>
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


.fontfix{
  text-shadow: 1px 1px 4px black;
}
</style>
