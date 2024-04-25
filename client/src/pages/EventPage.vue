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
import ProfileTicket from '../components/ProfileTicket.vue';

const events = computed(()=> AppState.activeEvent)
const eventImg = computed(()=> `url(${AppState.activeEvent?.coverImg})`)
const profiles = computed(()=> AppState.profiles)
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

async function getTicket(){
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
})
</script>


<template>
    <section class="row justify-content-center">
        <div class="col-12 col-md-8">
            <section class="row bgimage rounded">
                
            </section>
            <section class="row">
                <div class="col-8">
                    <div v-for="event in events" :key="event.id">
                        <EventDetailsCard :event="event"></EventDetailsCard>
                    </div>
                </div>
                <div class="col-4">
                    <div class="bg-primary rounded p-2">
                        <h4>You know you want to go</h4>
                        <p>Claim your spot!</p>
                        <button class="btn btn-primary" @click="getTicket">Ticket</button>
                    </div>
                    <div>
                        <p>Attendees</p>
                        <div class="bg-primary rounded p-2">
                            <div v-for="profile in profiles" :key="profile.id">
                                <ProfileTicket :profile="profile"></ProfileTicket>
                            </div>
                        </div>
                    </div>
                </div>
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
  height: 40dvh;
  object-fit: contain;
}
</style>