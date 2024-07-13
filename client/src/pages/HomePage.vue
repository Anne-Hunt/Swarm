<script setup>
import ModalComp from '../components/ModalComp.vue'
import EventForm from '../components/EventForm.vue';
import EventCard from '../components/EventCreatorProfileCard.vue';
import { AppState } from '../AppState.js';
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import { Event } from '../models/Event.js';
import { ticketService } from '../services/TicketService.js';
import { accountService } from '../services/AccountService.js';
import { onAuthLoaded } from '@bcwdev/auth0provider-client';

const account = (()=> {AppState.account})
const events = computed(()=> {
  if(filterTo.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == filterTo.value)})

const filterTo = ref('all')

const filters = [
  {
    name: 'digital',
    icon: 'mdi mdi-television text-info fs-1 fontfix'
  },
  {
    name: 'convention',
    icon: 'mdi mdi-table text-secondary fs-1 fontfix'
  },
  {
    name: 'concert',
    icon: 'mdi mdi-music text-party fs-1 fontfix'
  },
  {
    name: 'sport',
    icon: 'mdi mdi-soccer text-danger fs-1 fontfix'
  },
  {
    name: 'meeting',
    icon: 'mdi mdi-group text-warning fs-1 fontfix'
  }
]

async function getEvents(){
  try {
    await eventService.getEvents()
  } catch (error) {
    logger.log('Unable to get events', error)
    Pop.toast('Unable to load events', 'error')
  }
}

async function getUserTickets(){
    try {
        await ticketService.getUserTickets()
    } catch (error) {
        Pop.toast('unable to get tickets', 'error')
        logger.log('unable to get tickets', error)
    }
}

async function getAllTickets(){
  try {
      if (account != null) {
      await ticketService.getAllTickets()}
      else return
  } catch (error) {
      Pop.toast('unable to get all tickets', 'error')
        logger.log('unable to get all tickets', error)
  }
}

onMounted(()=>{
  getEvents()
})

onAuthLoaded(()=>{
  getAllTickets(
  )
})
</script>

<template>
  <div class="container-fluid p-0 m-0">
    <div class="container-fluid p-0">

      <div class="bgimage p-0 m-0">
        <div class="row justify-content-start align-items-center p-0 m-0">
          <div class="col-md-7 col-12 text-darkfontfix p-0">
            <div class="ps-5 pt-5 text-light">
              <h2 class="fontfix fs-1"><strong>Plan, Schedule, and Execute Events</strong></h2>
              <p class="fontfix fs-4"><strong>Never spend another night alone. Even your ex-girlfriend will want to go to your events. Let everyone know where to go, when, and for what, and they'll show up - all with Swarm.</strong></p>
            </div>
          </div>
        </div>
      </div>
      <!-- Section for Create and Search -->
      <section class="row p-3 m-0 justify-content-evenly">
        <h3 class="ps-5 py-3 text-dark">What Swarm Does</h3>
        <div class="col-md-5 col-12 shadow py-3 rounded bg-info mb-1">
          <div class="row modalOpener p-3">
            <div class="col-2 text-center text-info fs-1 fontfix">
              <i class="mdi mdi-magnify text-light"></i>
            </div>
            <div class="col-10 p-0 text-light fontfix">
              <h4>Find events you want today</h4>
              <p>Search for what you're looking for and possibly find the event to change your life.</p>
            </div>
          </div>
        </div>
        <div class="col-md-5 col-12 shadow p-0 bg-info rounded py-3 mb-1">
          <div class="row modalOpener p-3" role="button" data-bs-toggle="modal"
          data-bs-target="#modalId">
          <div class="col-2 text-center fontfix">       
            <i class="mdi mdi-plus-circle text-light fs-1"></i>
          </div>
          <div class="col-10 p-1 text-light fontfix">
            <h4>Start an event and attend!</h4>
            <p>See what everyone else is doing and then create an event of your own. </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Section for Category Filters-->
    <section class="row p-3 justify-content-evenly">
      <h3 class="px-5 py-3">Explore by Category</h3>
      <div class="col-lg-2 col-md-4 col-6 mb-2" role="button" @click="filterTo = 'all'">
        <div class="bg-primary rounded text-center text-light p-2">
          <h4>all</h4>
          <i class="mdi mdi-earth text-success fs-1 fontfix"></i>
        </div>
      </div>
      <div v-for="filterObj in filters" :key="filterObj.name" class="col-lg-2 col-md-4 col-6 mb-2"  role="button" @click="filterTo = filterObj.name">
        <div class="bg-primary rounded text-center p-2 text-light">
          <h4>{{filterObj.name}}</h4>
          <i :class="filterObj.icon"></i>
        </div>
      </div>
    </section>
    
    <!-- Section for Event Cards-->
    <section class="row justify-content-evenly align-items-center p-2">
      <h3 class="px-5 py-3">Upcoming Events</h3>
      <div class="col-md-4 col-6 p-2" v-for="event in events" :key="event.id">
        <EventCard :event="event" />
      </div>
    </section>
    <ModalComp modalId="event-create-modal">
      <EventForm/>
    </ModalComp>
  </div>
  </div>
</template>

<style scoped lang="scss">
.row{
  padding: 0;
  margin: 0;
}
.bgimage{
  background-color: black;
  background-image: url('https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-position:center;
  height: 65dvh;
 background-size: cover;
 filter: contrast(.8);
}

.fontfix{
  text-shadow: 1px 1px 4px black;
}

.fontpop{
  text-shadow: 1px 1px 2px black;
}

.modalOpener{
  height: 25dvh;
}

</style>
