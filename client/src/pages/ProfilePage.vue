<script setup>
import { computed, onBeforeMount, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';
import { eventService } from '../services/EventService.js';
import { AppState } from '../AppState.js';
import { onAuthLoaded } from '@bcwdev/auth0provider-client';
import { useRoute } from 'vue-router';
import { profileService } from '../services/ProfileService.js';

const profile = computed(()=>AppState.activeProfile)
const events = computed(()=> AppState.userEvents)
const tickets = computed(()=> AppState.usersTickets)
const route = useRoute()

async function getEventsByCreator(){
  try {
    const userId = route.params.profileId
    await eventService.getEventsByCreator(userId)
  } catch (error) {
    logger.log('Unable to get events', error)
    Pop.toast('Unable to load events', 'error')
  }
}

async function getTickets(){
  try {
        const profileId = AppState.activeProfile.id
        await ticketService.getAllTickets()
        const tickets = AppState.tickets.filter(ticket => profileId == ticket.accountId)
        AppState.usersTickets = tickets
  } catch (error) {
        // Pop.toast('unable to get all tickets', 'error')
        logger.log('unable to get all tickets', error)
  }
}

async function setActiveProfile(profileId) {
  try {
        await profileService.setActiveProfile(profileId)
  } catch (error) {
        // Pop.toast('unable to get all tickets', 'error')
        logger.log('unable to get all tickets', error)
  }
}

onMounted(()=>{
    getTickets()
    getEventsByCreator()
})

onBeforeMount(()=>{
  setActiveProfile(route.params.profileId)
}
)

</script>


<template>
    <div class="about text-center">
      <div v-if="AppState.activeProfile" class="row p-0 m-0">
        <div class="col-12 bg-warning text-light shadow pb-2">
          <h1 class="py-2 fontfix">Meet {{ profile.name }}</h1>
          <img class="rounded-circle profile border border-5 border-light shadow" :src="profile.picture" alt="" />
        </div>
  
        <div class="row p-3">
          <h2>Tickets</h2>
      </div>
      <section class="row px-3">
          <div v-for="ticket in tickets" :key="ticket.id" class="col-6 col-md-4 p-1">
              <ProfileTicketCard :ticket="ticket"/>
          </div>
      </section>
      <div class="row">
          <h2>Events</h2>
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