<script setup>
import ModalComp from '../components/ModalComp.vue'
import EventForm from '../components/EventForm.vue';
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';

const meets = computed(()=> AppState.events)

const meetData = ref({
  name: '',
  description: '',

})

async function getEvents(){
try {
  await eventService.getEvents()
} catch (error) {
  logger.log('Unable to get events', error)
  Pop.toast('Unable to load events', 'error')
}
}



onMounted(()=>{getEvents()})
</script>

<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
<div v-for="meet in meets" :key="meet.id">
  <EventCard :meet="meet"/>
</div>
  </div>

  <ModalComp>
    <EventForm/>
  </ModalComp>
</template>

<style scoped lang="scss">


</style>
