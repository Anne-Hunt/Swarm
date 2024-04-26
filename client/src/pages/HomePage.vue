<script setup>
import ModalComp from '../components/ModalComp.vue'
import EventForm from '../components/EventForm.vue';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import { Event } from '../models/Event.js';

const events = computed(()=> {
  if(filterTo.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == filterTo.value)})

const filterTo = ref('all')
const filters = [
  {
    name: 'digital',
    icon: 'mdi mdi-television text-light'
  },
  {
    name: 'convention',
    icon: 'mdi mdi-earth text-primary'
  },
  {
    name: 'concerts',
    icon: 'mdi mdi-music text-secondary'
  },
  {
    name: 'sports',
    icon: 'mdi mdi-soccer text-warning'
  },
  {
    name: 'meetings',
    icon: 'mdi mdi-group text-danger'
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

onMounted(()=>{
  getEvents()
  })
</script>

<template>
  <div class="bgimage">
    <div class="row justify-content-start align-items-center">
      <div class="col-md-7 col-12 text-dark p-4 fontfix">
        <div class="p-5 text-light">
          <h2><strong>Plan, Schedule, and Execute Events</strong></h2>
          <p><strong>Never spend another night alone. Even your ex-girlfriend will want to go to your events. Let everyone know where to go, when, and for what, and they'll show up - all with Swarm.</strong></p>
        </div>
      </div>
    </div>
  </div>
<!-- Section for Create and Search -->
  <section class="row p-5 justify-content-evenly">
    <h3 class="p-2">What Swarm Does</h3>
    <div class="col-5">
      <div class="row bg-primary rounded p-2 modalOpener p-3">
        <div class="col-2 text-center text-warning">
          <i class="mdi mdi-magnify"></i>
        </div>
        <div class="col-10 p-1">
          <h3>Find events you want today</h3>
          <p>Search for what you're looking for and possibly find the event to change your life.</p>
        </div>
      </div>
    </div>
    <div class="col-5">
      <div class="row bg-primary rounded p-2 modalOpener p-3" role="button" data-bs-toggle="modal"
    data-bs-target="#modalId">
        <div class="col-2 text-center">          
          <i class="mdi mdi-plus-circle text-warning"></i>
        </div>
        <div class="col-10 p-1">
          <h4>Start an event and make everyone attend!</h4>
          <p>See what everyone else is doing and then create an event of your own. </p>
        </div>
      </div>
    </div>
  </section>
<!-- Section for Category Filters-->
  <section class="row p-3 justify-content-evenly">
    <h3 class="p-3">Explore by Category</h3>

    <div v-for="filterObj in filters" :key="filterObj.name" class="col-2 bg-success rounded text-center p-2" role="button" @click="filterTo = filterObj.name">
      <i :class="filterObj.icon"></i>
      <h4>{{filterObj.name}}</h4>
    </div>
  </section>

<!-- Section for Event Cards-->
<section class="row justify-content-evenly align-items-center p-2">
  <h3 class="p-3">Upcoming Events</h3>
    <div class="col-4 p-2" v-for="event in events" :key="event.id">
      <EventCard :event="event" />
  </div>
</section>
  <ModalComp modalId="event-create-modal">
    <EventForm/>
  </ModalComp>
</template>

<style scoped lang="scss">
i {
  font-size: xx-large;
}

.bgimage{
  background-color: black;
  background-image: url('https://images.unsplash.com/photo-1569430251091-da3b108cff29?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvbmZpcmV8ZW58MHx8MHx8fDA%3D');
  background-position: center;
  height: 50dvh;
  object-fit: cover;
  filter: blur(10);
}

.fontfix{
   text-shadow: 0 0 9 black;
}

.modalOpener{
  height: 25dvh;
}

</style>
