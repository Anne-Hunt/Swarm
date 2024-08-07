<script setup>
import { computed } from 'vue';
import { Event } from '../models/Event.js';
import { AppState } from '../AppState.js';
import { eventService } from '../services/EventService.js';
import { ticketService } from '../services/TicketService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { Ticket } from '../models/Ticket.js';

const eventProps = defineProps({event: {type: Event, required: true}, ticket: Ticket})
const userProfile = computed(()=> AppState.account)
const eventimage = computed(()=> `url(${eventProps.event.coverImg})`)

// eslint-disable-next-line vue/return-in-computed-property
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

    async function cancelEvent(){
        try {
            const confirmation = await Pop.confirm('Do you wan to cancel your event?')
            if(!confirmation) return
            const eventId = eventProps.event.id
            await eventService.cancelEvent(eventId)
        } catch (error) {
            Pop.toast('unable to cancel', 'error')
        logger.log('Unable to cancel', error)
        }
    }
</script>


<template>
        <RouterLink :to="{name: 'Event Details', params: {eventId: event.id}}">
            <div class="card rounded">
                <div class="card-image-top eventimage rounded-top justify-content-between">
                    <span class="bgcolor text-light p-1 rounded">{{ event.type }}</span> 
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="card-title col-10"><strong>{{ event.name }}</strong></div>
                        <div v-if="event.creatorId == userProfile?.id" class="text-end col-2">
                                <span class="dropdown">
                                    <span class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></span>
                                    <ul class="dropdown-menu">
                                        <li><button class="dropdown-item"  @click="cancelEvent">Cancel Event</button></li>
                                    </ul>
                                </span>
                            </div>
                        <div v-else></div>
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
    height: 15dvh;
}


.container{
  position: relative;
}

.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

.bgcolor{
    background-color: v-bind(colorType);
}
</style>