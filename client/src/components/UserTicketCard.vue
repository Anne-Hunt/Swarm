<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketService } from '../services/TicketService.js';
import { Ticket } from '../models/Ticket.js';

const ticketProp = defineProps({ticket: {type: Ticket, required: true}})
const userProfile = computed(()=> AppState.account)

// eslint-disable-next-line vue/return-in-computed-property
const colorType = computed(()=>{
    switch(ticketProp.ticket.event.type){
        case 'digital':
            return '#17a2b8'
        case 'convention':
            return '#f7c32e'
        case 'concert':
            return '#aa49f9'
        case 'sport':
            return '#d6293e'
        case 'meeting':
            return '#0cbc87'
    }
})

async function deleteTicket(ticketId){
    try {
        await Pop.confirm('Do you want to cancel your ticket?')
        if (!confirm) return
        await ticketService.deleteTicket(ticketId)
    } catch (error) {
        Pop.toast('unable to delete ticket', 'error')
        logger.log('Unable to delete ticket', error)
    }
}

</script>


<template>
    <div class="card rounded">
                <RouterLink :to="{name: 'Event Details', params: {eventId: ticket.event.id}}">
                <div class="card-image-top eventimage rounded-top pt-1" :style="{backgroundImage: `url(${ticket.event.coverImg})`}">
                    <span class="bgcolor text-light p-1 rounded">{{ ticket.event.type }}</span> 
                    <span v-if="ticket.event.isCanceled === true" class="bg-danger text-light p-1 rounded">CANCELED</span>
                    <span v-else class="bg-success text-light p-1 rounded">OPEN</span>
                </div>
            </RouterLink>
                <div class="card-body">
                    <div class="row">
                        <div class="card-title col-10"><strong>{{ ticket.event.name }}</strong></div>
                        <div class="text-end col-2">
                            </div>
                    </div>
                    <div class="card-description pb-1">
                        <span>{{ ticket.event.startDate }} - <small>{{ ticket.event.location }}</small></span>
                    </div>
                    <div v-if="ticket.event.isCanceled == false">
                        <button class="btn btn-danger" @click="deleteTicket(ticket.id)">DELETE TICKET</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-danger" disabled>Canceled</button>
                    </div>
                </div>
            </div>
</template>


<style lang="scss" scoped>
.eventimage{
    background-position: center;
    background-size: cover;
    height: 25dvh;
}

.bgcolor{
    background-color: v-bind(colorType);
}
</style>