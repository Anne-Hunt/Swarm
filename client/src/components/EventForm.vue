<script setup>
import { computed, ref } from 'vue';
import { eventService } from '../services/EventService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { AppState } from '../AppState.js';
import { useRouter } from 'vue-router';


const account = computed(()=> AppState.account)
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
  duration: '',
  ticketCount: 0
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
  duration: '',
  ticketCount: 0
}
}

async function createEvent(){
  try {
    const eventDataValue = eventData.value
    const event = await eventService.createEvent(eventDataValue)
    resetForm()
    Modal.getOrCreateInstance('#event-create-modal').toggle()
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
    <form @submit.prevent="createEvent()" class="row">
        <div class="form-floating mb-3">
            <input v-model="eventData.name" type="text" class="form-control" name="name" id="eventName" placeholder="" minlength="3" maxlength="50" required/>
            <label for="eventName">Name</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="eventData.location" type="text" class="form-control" name="location" id="eventLocation" placeholder="" minlength="15" maxlength="1000" required/>
            <label for="eventLocation">Location</label>
        </div>
        <!-- <div class="mb-3">
    <label for="eventDatepicker">Choose a date</label>
    <b-form-datepicker id="eventDatepicker" name="startDate" v-model="eventData.startDate" class="mb-2"></b-form-datepicker>
  </div> -->
        <div class="form-floating mb-3">
            <input v-model="eventData.startDate" type="date" class="form-control" name="startDate" id="eventDate" placeholder="" required/>
            <label for="eventDate">Date</label>
        </div>
        <div class="form-floating mb-3">
          <input type="time" v-model="eventData.time" class="form-control" name="time" id="eventTime" required>
          <label for="eventTime"></label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="eventData.duration" type="text" class="form-control" name="duration" id="eventDuration" placeholder="" minlength="2" maxlength="15" required/>
            <label for="eventDuration">Duration</label>
        </div>
        <div class="mb-3">
            <label for="eventType">Category</label>
            <select v-model="eventData.type" name="type" id="eventType" class="form-select" aria-label="Default select example" required>
  <option selected>Choose a Category</option>
  <option value="concert">Concert</option>
  <option value="convention">Convention</option>
  <option value="sport">Sport</option>
  <option value="digital">Digital</option>
  <option value="meeting">Meeting</option>
</select>
        </div>
        <div class="form-floating mb-3">
            <input v-model="eventData.coverImg" type="url" class="form-control" name="coverImg" id="eventImg" placeholder="http://" required/>
            <label for="eventImg">Image</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="eventData.description" type="textarea" class="form-control" name="description" id="eventDescription" placeholder="" minlength="15" maxlength="1000" required/>
            <label for="eventDescription">Description</label>
        </div>
        <!-- <div class="d-flex align-items-center mb-3">
            <input v-model="eventData.isCanceled" type="checkbox" class="form-check-input" name="isCanceled" id="eventCancel" unchecked required/>
            <label class="form-check-label" for="eventCancel">Cancel Event?</label>
        </div> -->
        <div class="form-floating mb-3">
            <input v-model="eventData.capacity" type="number" class="form-control" name="capacity" id="eventCapacity" placeholder="" min="1" max="1000" required/>
            <label for="eventCapacity">Capacity</label>
            <button class="btn btn-success" type="submit"><small>SUBMIT</small></button>
        </div>


    </form>
</div>
</template>


<style lang="scss" scoped>

</style>