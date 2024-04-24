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
  <div>
    <button
    type="button"
    class="btn btn-primary btn-lg"
    data-bs-toggle="modal"
    data-bs-target="#modalId"
>
    Launch
</button>
  </div>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
<div v-for="event in events" :key="event.id">
  <EventCard :event="event"/>
</div>
  </div>
  <ModalComp modalId="event-create-modal">
    <EventForm/>
  </ModalComp>
</template>

<style scoped lang="scss">


</style>
