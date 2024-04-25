<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { eventService } from '../services/EventService.js';
import { commentService } from '../services/CommentService.js';
import { profileService } from '../services/ProfileService.js';
import { ticketService } from '../services/TicketService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import ProfileTicket from '../components/ProfileTicket.vue';
import { Event } from '../models/Event.js';
import { Comment } from '../models/Comment.js';
import { Profile } from '../models/Profile.js';
import { Ticket } from '../models/Ticket.js';
import { Account } from '../models/Account.js';
// import EventDetailsCard from '../components/EventDetailsCard.vue';

const activeEvent = computed(()=> AppState.activeEvent)
const eventImg = computed(()=> `url(${AppState.activeEvent?.coverImg})`)
// const profiles = computed(()=> AppState.profiles)
const tickets = computed(()=> AppState.tickets)
const comments = computed(()=>AppState.comments)
const userProfile = computed(()=> AppState.account)
const usersTickets = computed(()=> AppState.usersTickets)
const userTicket = computed(()=> AppState.usersTickets.find(userTicket => userTicket.eventId == activeEvent.value.id))
const attending = computed(()=> AppState.usersTickets.find(usersTicket => usersTicket.id == userTicket.value.id))
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

// async function getProfiles(){
//     try {
//         const eventId = route.params.eventId
//         await profileService.getProfiles(eventId)
//     } catch (error) {
//         Pop.toast('Unable to load profiles', 'error')
//         logger.log('Unable to load profiles', error)
//     }
// }

async function createTicket(){
    try {
        const ticketData = {eventId: route.params.eventId}
        await ticketService.createTicket(ticketData)
    } catch (error) {
        Pop.toast('Unable to load tickets', 'error')
        logger.log('Unable to load tickets', error)
    }
}

async function getTickets(){
    try {
        await ticketService.getTickets(route.params.eventId)
    } catch (error) {
        Pop.toast('Unable to get tickets', 'error')
        logger.log('Unable to get tickets', error)
    }
}

async function getUserTicket(){
    try {
        await ticketService.getTicketById()
    } catch (error) {
        Pop.toast('unable to find ticket', 'error')
        logger.log('unable to find ticket', 'error')
    }
}

async function deleteTicket(){
    try {
        Pop.confirm('Do you want to cancel your ticket?')
        if (!confirm) return
        await ticketService.deleteTicket()
    } catch (error) {
        Pop.toast('unable to delete ticket', 'error')
        logger.log('Unable to delete ticket', error)
    }
}

onMounted(()=>{
    getActiveEvent()
    getComments()
    // getProfiles() 
    getTickets()
    getUserTicket()
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
                    <div v-if="AppState.account">
                        <div v-if="userTicket" class="bg-success rounded p-2">
                            <h4>You're going!</h4>
                            <p>Changed your mind?</p>
                            <button class="btn btn-secondary" @click="deleteTicket">Cancel</button>
                        </div>
                        <div v-else class="bg-primary rounded p-2">
                            <h4>You know you want to go</h4>
                            <p>Claim your spot!</p>
                            <button class="btn btn-primary" @click="createTicket">Ticket</button>
                        </div>
                    </div>
                    <div>
                        <p>Attendees</p>
                        <div class="bg-primary rounded p-2">
                            <div v-for="ticket in tickets" :key="ticket.id">
                                <ProfileTicket :ticket="ticket"/>
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