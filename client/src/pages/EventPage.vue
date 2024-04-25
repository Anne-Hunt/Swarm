<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { eventService } from '../services/EventService.js';
import { Event } from '../models/Event.js';
import { commentService } from '../services/CommentService.js';
import { profileService } from '../services/ProfileService.js';
import { ticketService } from '../services/TicketService.js';

const activeEvent = computed(()=> AppState.activeEvent)
const eventImg = computed(()=> `url(${activeEvent.value.coverImg})`)
const route = useRoute()

async function getActiveEvent(){
try {
    const eventId = route.params.eventId
    await eventService.setActiveEvent(eventId)
} catch (error) {
    Pop.toast('Unable to load Event', 'error')
    logger.log('Unable to load event', error)
}
}

async function getComments(){
    try {
        const eventId = route.params.eventId
        await commentService.getComments(eventId)
    } catch (error) {
        Pop.toast('Unable to load comments', 'error')
        logger.log('Unable to load comments', error)
    }
}

async function getProfiles(){
    try {
        const eventId = route.params.eventId
        await profileService.getProfiles(eventId)
    } catch (error) {
        Pop.toast('Unable to load profiles', 'error')
        logger.log('Unable to load profiles', error)
    }
}

async function getTickets(){
    try {
        const eventId = route.params.eventId
        await ticketService.getTickets(eventId)
    } catch (error) {
        Pop.toast('Unable to load tickets', 'error')
        logger.log('Unable to load tickets', error)
    }
}

onMounted(()=>{
    getActiveEvent()
    getComments()
    getProfiles()
    getTickets()
})
</script>


<template>
    <section class="row">
        <div class="col-8">
            <section class="row bgimage rounded">

            </section>
        </div>

    </section>
<div>
    
</div>
</template>


<style lang="scss" scoped>
.bgimage{
  background-color: black;
  background-image: v-bind(eventImg);
  background-position: center;
  height: 50dvh;
  width: 75%;
  object-fit: contain;
}
</style>