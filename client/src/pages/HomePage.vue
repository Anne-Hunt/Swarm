<script setup>
import ModalComp from '../components/ModalComp.vue'
import EventForm from '../components/EventForm.vue';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
// import { Modal } from 'bootstrap';

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
      <div class="col-md-7 col-12 text-light p-4 fontfix">
        <h2>Plan, Schedule, and Execute Events</h2>
        <p>Never spend another night alone. Even your ex-girlfriend will want to go to your events. Let everyone know where to go, when, and for what, and they'll show up - all with Swarm.</p>
      </div>
    </div>
  </div>

  <section class="row p-5 justify-content-evenly">
    <h3>What Swarm Does</h3>
    <div class="col-4">
      <div class="row bg-primary rounded">
        <div class="col-3">
          <i class="mdi mdi-magnify"></i>
        </div>
        <div class="col-9">
          Search for all your events and things to do
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="row bg-primary rounded" role="button" data-bs-toggle="modal"
    data-bs-target="#modalId">
        <div class="col-3">          
          <i class="mdi mdi-plus-circle"></i>
        </div>
        <div class="col-9">
          <h4>Start an event and make everyone attend!</h4>
          <p>See what everyone else is doing and then create an event of your own. Guaranteed to be exactly what you make it.</p>
        </div>
      </div>
    </div>
  </section>
//SECTION - 
  <section class="row p-3 justify-content-evenly">
    <h3>Explore by Category</h3>
    <div class="col-2 bg-success rounded text-center">
      <i class="mdi mdi-earth"></i>
      <h4>Conventions</h4>
    </div>
    <div class="col-2 bg-success rounded text-center">
      <i class="mdi mdi-music"></i>
      <h4>Concerts</h4>
    </div>
    <div class="col-2 bg-success rounded text-center">
      <i class="mdi mdi-group"></i>
      <h4>Meetings</h4>
    </div>
    <div class="col-2 bg-success rounded text-center">
      <i class="mdi mdi-soccer"></i>
      <h4>Sports</h4>
    </div>
    <div class="col-2 bg-success rounded text-center">
      <i class="mdi mdi-television"></i>
      <h4>Digital</h4>
    </div>
  </section>
//SECTION - 
  <section class="row" v-for="event in events" :key="event.id">
    <EventCard :event="event"></EventCard>

  </section>

<section class="row">
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
    </div>
  </div>
</section>
  <ModalComp modalId="event-create-modal">
    <EventForm/>
  </ModalComp>
</template>

<style scoped lang="scss">
.bgimage{
  background-color: black;
  background-image: url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-position: center;
  height: 50dvh;
  object-fit: contain;
}
.fontfix{
   text-shadow: 0 0 8.5 black;
}

</style>
