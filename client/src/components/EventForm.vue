<script setup>
import { computed, ref } from 'vue';
import { eventService } from '../services/EventService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { AppState } from '../AppState.js';



const account = computed(()=> AppState.account)

let meetData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: 0,
  startDate: '',
  isCanceled: false,
  type: [],
  duration: ''
})

function resetForm(){
    meetData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: 0,
  startDate: '',
  isCanceled: false,
  type: [],
  duration: '',
  creatorId: account.value.id,
  creator: account
})
}

async function createEvent(){
  try {
    const eventData = meetData.value
    await eventService.createEvent(eventData)
    resetForm()
    Modal.getOrCreateInstance('event-create-modal').hide
  } catch (error) {
    logger.log('Unable to create event', error)
    Pop.toast('Unable to create event', 'error')
  }
}
</script>


<template>
<div>
    <form @submit.prevent="createEvent">
        <div class="form-floating mb-3">
            <input v-model="meetData.name" type="text" class="form-control" name="name" id="eventName" placeholder=""/>
            <label for="eventName">Name</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.location" type="text" class="form-control" name="location" id="eventLocation" placeholder=""/>
            <label for="eventLocation">Location</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.startDate" type="text" class="form-control" name="startDate" id="eventDate" placeholder=""/>
            <label for="eventDate">Date</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.duration" type="text" class="form-control" name="duration" id="eventDuration" placeholder=""/>
            <label for="eventDuration">Duration</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.type" type="text" class="form-control" name="type" id="eventType" placeholder=""/>
            <label for="eventType">Category</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.coverImg" type="text" class="form-control" name="coverImg" id="eventImg" placeholder="http://"/>
            <label for="eventImg">Image</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.description" type="textarea" class="form-control" name="description" id="eventDescription" placeholder=""/>
            <label for="eventDescription">Description</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.isCanceled" type="checkbox" class="form-control" name="isCanceled" id="formId1" unchecked/>
            <label for="formId1">Cancel Event?</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="meetData.capacity" type="text" class="form-control" name="capacity" id="eventCapacity" placeholder=""/>
            <label for="eventCapacity">Capacity</label>
        </div>


    </form>
</div>
</template>


<style lang="scss" scoped>

</style>