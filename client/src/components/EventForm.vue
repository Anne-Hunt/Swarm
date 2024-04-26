<script setup>
import { ref } from 'vue';
import { eventService } from '../services/EventService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
// import { AppState } from '../AppState.js';


// const account = computed(()=> AppState.account)
const route = useRouter()

let eventData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: 0,
  startDate: '',
  time: '',
  isCanceled: false,
  type: [],
  duration: ''
})

function resetForm(){
    eventData.value = {
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: 0,
  startDate: '',
  time: '',
  isCanceled: false,
  type: [],
  duration: ''
}
}

async function createEvent(){
  try {
    const eventDataValue = eventData.value
    const event = await eventService.createEvent(eventDataValue)
    resetForm()

    // REVIEW maybe change this id? Maybe wait until passing?
    Modal.getOrCreateInstance('#modalId').toggle()
    Pop.toast('Event created!', 'success')
    route.push({name: 'Event Details', params: {eventId: event.id}})
  } catch (error) {
    logger.log('Unable to create event', error)
    Pop.toast('Unable to create event', 'error')
  }
}
</script>


<template>
  <div class="container-fluid">
    <form @submit.prevent="createEvent()" class="row justify-content-between">
      <div class="col-6">
        <label for="preview">Image Preview</label>
        <img class="img-fluid mb-2" :src="eventData.coverImg || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFydHl8ZW58MHx8MHx8fDA%3D'" alt="">
        <div class="form-floating mb-3">
          <input v-model="eventData.coverImg" type="url" class="form-control form-control-sm" name="coverImg" id="eventImg"
            placeholder="http://" required />
          <label for="eventImg">Image</label>
        </div>
      </div>
      <div class="col-6">
        <div class="form-floating mb-3">
          <input v-model="eventData.name" type="text" class="form-control form-control-sm" name="name" id="eventName" placeholder=""
          minlength="3" maxlength="50" required />
          <label for="eventName">Event Name</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="eventData.location" type="text" class="form-control form-control-sm" name="location" id="eventLocation"
            placeholder="" minlength="15" maxlength="1000" required />
          <label for="eventLocation">Event Location</label>
        </div>
        <div class="mb-3">
          <label for="eventType">Category</label>
          <select v-model="eventData.type" name="type" id="eventType" class="form-select"
            aria-label="Default select example" required>
            <option selected>Choose a Category</option>
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div class="row">

          <div class="form-floating mb-3 w-50">
            <input v-model="eventData.startDate" type="date" class="form-control form-control-sm" name="startDate" id="eventDate"
              placeholder="" required />
            <label for="eventDate">Date</label>
          </div>
          <div class="form-floating mb-3 w-50">
            <input v-model="eventData.duration" type="text" class="form-control form-control-sm" name="duration" id="eventDuration"
              placeholder="2 hours" minlength="2" maxlength="15" required />
            <label for="eventDuration">Duration</label>
          </div>
        </div>
        <div class="row">
          <div class="form-floating mb-3 w-50">
            <input type="time" v-model="eventData.time" class="form-control form-control-sm" name="time" id="eventTime" required>
            <label for="eventTime">Time</label>
          </div>
          <div class="form-floating mb-3 w-50">
            <input v-model="eventData.capacity" type="number" class="form-control form-control-sm" name="capacity" id="eventCapacity"
              placeholder="" min="1" max="1000" required />
            <label for="eventCapacity form-control-sm">Capacity</label>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input v-model="eventData.description" type="textarea" class="form-control description 
        text-top" name="description"
          id="eventDescription" placeholder="" minlength="15" maxlength="1000" required />
        <label for="eventDescription">Description</label>
      </div>
      <div class="text-end">
        <button class="btn btn-success" type="submit"><small>SUBMIT</small></button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>
.description{
  height: 20dvh;
  overflow:scroll;
}
</style>