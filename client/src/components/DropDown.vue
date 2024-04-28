<script setup>
import { computed } from 'vue';
import { Event } from '../models/Event.js';
import { Ticket } from '../models/Ticket.js';
import { ticketService } from '../services/TicketService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { eventService } from '../services/EventService.js';
import { useRoute } from 'vue-router';

const props = defineProps({ticket: Ticket, event: Event})
const userProfile = computed(()=> AppState.account)
const route = useRoute()

async function createTicket(){
    try {
        const ticket = props.ticket.id
        const ticketData = {eventId: ticket}
        await ticketService.createTicket(ticketData)
    } catch (error) {
        Pop.toast('Unable to load tickets', 'error')
        logger.log('Unable to load tickets', error)
    }
}

async function deleteTicket(){
    try {
        await Pop.confirm('Do you want to cancel your ticket?')
        if (!confirm) return
        await ticketService.deleteTicket()
    } catch (error) {
        Pop.toast('unable to delete ticket', 'error')
        logger.log('Unable to delete ticket', error)
    }
}

async function cancelEvent(){
        try {
            const confirmation = await Pop.confirm('Do you want to cancel your event?')
            if(!confirmation) return
            const eventId = route.params.eventId
            await eventService.cancelEvent(eventId)
        } catch (error) {
            Pop.toast('unable to cancel', 'error')
        logger.log('Unable to cancel', error)
        }
    }
</script>


<template>
    <span class="dropdown">
        <span class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i
                class="mdi mdi-dots-horizontal"></i></span>
        <ul class="dropdown-menu">
            <li><button class="dropdown-item" @click="$router.push(`/events/${event.id}`)">See Event Details</button>
            </li>
            <li v-if="ticket.accountId == userProfile?.id"><button class="dropdown-item" @click="deleteTicket">Cancel
                    Ticket</button></li>
            <li v-else-if="event.creatorId == userProfile?.id"><button class="dropdown-item" @click="cancelEvent">Cancel
                    Event</button></li>
            <li v-else-if="userProfile?.id"><button class="dropdown-item" @click="createTicket">Get Ticket</button></li>
        </ul>
    </span>
</template>


<style lang="scss" scoped>

</style>