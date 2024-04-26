<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';
import { Ticket } from '../models/Ticket.js';
import { Profile } from '../models/Profile.js';
import { Event } from '../models/Event.js';
import { Comment } from '../models/Comment.js';
import { eventService } from '../services/EventService.js';
import Login from '../components/Login.vue';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';

const events = computed(()=> AppState.userEvents)
const tickets = computed(()=> AppState.usersTickets)
const account = computed(()=> AppState.account)

async function getEventsByCreator(){
  try {
    const userId = account.value.id
    await eventService.getEventsByCreator(userId)
  } catch (error) {
    logger.log('Unable to get events', error)
    Pop.toast('Unable to load events', 'error')
  }
}

async function getUserEvents(){
    try {
        // const userId = account.value.id
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

onMounted(()=> {
    getEventsByCreator()
    getUserEvents()
})
</script>


<template>
    <section class="row p-5">
        <Login/>
    </section>
    <div v-if="!AppState.account">
        <span><i class="mdi mdi-loading fs-1"></i> Loading Your Events</span>
    </div>
    <div v-else>
        <section class="row">
            <h2>Your Events</h2>
            <div class="col-4 p-1" v-for="event in events" :key="event?.id">
                <EventCard :event="event"/>
            </div>
        </section>
        <section v-if="tickets" class="row">
            <h2>Your Tickets</h2>
            <div class="col-4 p-1" v-for="event in tickets" :key="event?.id">
                <EventCard :ticket="event"/>
            </div>
        </section>
    </div>
</template>


<style lang="scss" scoped>

</style>