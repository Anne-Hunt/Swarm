<script setup>
import { computed } from 'vue';
import { Event } from '../models/Event.js';
import { AppState } from '../AppState.js';
import { eventService } from '../services/EventService.js';
import { ticketService } from '../services/TicketService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { Ticket } from '../models/Ticket.js';

const eventProps = defineProps({event: {type: Event, required: true}})
const userProfile = computed(()=> AppState.account)
const eventimage = computed(()=> `url(${event.coverImg})`)

const colorType = computed(()=>{
    switch(eventProps.event.type){
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

async function setActiveEvent(event){
    try {
      AppState.activeEvent = event
    }
    catch (error){
      Pop.error(error);
      logger.log("unable to set active Event", error)
    }
}

</script>


<template>
        <RouterLink :to="{name: 'Event Details', params: {eventId: event.id}}" @click="setActiveEvent(event)">
            <div class="card rounded">
                <div class="card-image-top eventimage rounded-top justify-content-between">
                    <span class="bgcolor text-light p-1 rounded">{{ event.type }}</span> 
                    <span v-if="event.isCanceled === true" class="bg-danger text-light p-1 rounded">CANCELED</span>
                    <span v-else class="bg-success text-light p-1 rounded">OPEN</span>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="card-title col-10"><strong>{{ event.name }}</strong></div>
                        <div class="text-end col-2">
                            </div>
                    </div>
                    <div class="card-subtitle"><span>Hosted by {{ event.creator.name }}</span></div>
                    <div class="card-description">
                        <span>{{ event.startDate }} - <small>{{ event.location }}</small></span><br>
                        <span>{{ event.ticketCount }} people are going</span>
                    </div>
                </div>
            </div>
        </RouterLink>
</template>


<style lang="scss" scoped>
.eventimage{
    background-image: v-bind(eventimage);
    background-position: center;
    background-size: cover;
    height: 25dvh;
}

.bgcolor{
    background-color: v-bind(colorType);
}
</style>