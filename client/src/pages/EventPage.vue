<script setup>
import { computed, onMounted, ref } from 'vue';
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
import { Comment } from '../models/Comment.js';
import { Profile } from '../models/Profile.js';
// import EventDetailsCard from '../components/EventDetailsCard.vue';

const activeEvent = computed(()=> AppState.activeEvent)
const eventImg = computed(()=> `url(${AppState.activeEvent?.coverImg})`)
const profiles = computed(()=> AppState.profiles)
const tickets = computed(()=> AppState.tickets)
const comments = computed(()=>AppState.comments)
const profile = computed(()=> AppState.account)
const route = useRoute()

const ticketData = ref({
    creatorId: profile.value.id,
    eventId: route.params.eventId
})


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

async function createTicket(){
    try {
        await ticketService.createTicket(ticketData)
        ticketData.value = {creatorId: profile.value.id, eventId: route.params.eventId}
    } catch (error) {
        Pop.toast('Unable to load tickets', 'error')
        logger.log('Unable to load tickets', error)
    }
}

async function getTickets(){
    try {
        const eventId = route.params.eventId
        await ticketService.getTickets(eventId)
    } catch (error) {
        Pop.toast('Unable to get tickets', 'error')
        logger.log('Unable to get tickets', error)
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
    <section class="row justify-content-center">
        <div v-if="activeEvent" class="col-12 col-md-8">
            <section class="row bgimage rounded"></section>
            <section class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-8">
                            <h2>{{ activeEvent.name }} </h2>
                            <span class="rounded-pill bg-primary">{{ activeEvent.type }}</span>
                        </div>
                        <div v-if="AppState.account" class="col-4">
                            <button class="btn btn-primary"><i class="mdi mdi-dots-horizontal fs-1"></i></button>
                        </div>
                    </div>
                    <div v-if="activeEvent" class="row">
                        <div class="col-12">
                            <p> {{ activeEvent.description }}
                            </p>
                            <h4>Date and Time</h4>
                            <span>{{ activeEvent.startDate }} at {{ activeEvent.time }}</span>
                            <h4>Location</h4>
                            <span>{{ activeEvent.location }}</span>
                        </div>
                    </div>
                    <section class="row">
                        <div v-if="AppState.account">
                            <CommentForm/>
                        </div>
                        <div v-for="comment in comments" :key="comment.id">
                            <CommentCard :comment="comment"/>
                        </div>
                    </section>
                </div>
                <div class="col-4">
                    <div class="bg-primary rounded p-2">
                        <h4>You know you want to go</h4>
                        <p>Claim your spot!</p>
                        <button class="btn btn-primary" @click="createTicket">Ticket</button>
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