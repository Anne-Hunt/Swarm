<script setup>
import ModalComp from '../components/ModalComp.vue'
import EventForm from '../components/EventForm.vue';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import { Event } from '../models/Event.js';

const events = computed(()=> AppState.events)

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
        <div class="p-5">
          <h2><strong>Plan, Schedule, and Execute Events</strong></h2>
          <p><strong>Never spend another night alone. Even your ex-girlfriend will want to go to your events. Let everyone know where to go, when, and for what, and they'll show up - all with Swarm.</strong></p>
        </div>
      </div>
    </div>
  </div>
<!-- Section for Create and Search -->
  <section class="row p-5 justify-content-evenly">
    <h3 class="p-2">What Swarm Does</h3>
    <div class="col-4">
      <div class="row bg-primary rounded p-2 modalOpener">
        <div class="col-2 text-center text-warning">
          <i class="mdi mdi-magnify"></i>
        </div>
        <div class="col-10 p-1">
          <h3>Find events you want today</h3>
          <p>Search for what you're looking for and possibly find the event to change your life.</p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="row bg-primary rounded p-2 modalOpener" role="button" data-bs-toggle="modal"
    data-bs-target="#modalId">
        <div class="col-2 text-center ">          
          <i class="mdi mdi-plus-circle text-warning"></i>
        </div>
        <div class="col-10 p-1">
          <h4>Start an event and make everyone attend!</h4>
          <p>See what everyone else is doing and then create an event of your own. Guaranteed to be exactly what you make it.</p>
        </div>
      </div>
    </div>
  </section>
<!-- Section for Category Filters-->
  <section class="row p-3 justify-content-evenly">
    <h3 class="p-3">Explore by Category</h3>
    <div class="col-2 bg-success rounded text-center p-2">
      <i class="mdi mdi-earth text-primary"></i>
      <h4>Conventions</h4>
    </div>
    <div class="col-2 bg-success rounded text-center p-2">
      <i class="mdi mdi-music text-secondary"></i>
      <h4>Concerts</h4>
    </div>
    <div class="col-2 bg-success rounded text-center p-2">
      <i class="mdi mdi-group text-danger"></i>
      <h4>Meetings</h4>
    </div>
    <div class="col-2 bg-success rounded text-center p-2">
      <i class="mdi mdi-soccer text-warning"></i>
      <h4>Sports</h4>
    </div>
    <div class="col-2 bg-success rounded text-center p-2">
      <i class="mdi mdi-television text-light"></i>
      <h4>Digital</h4>
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
  background-image: url('https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
