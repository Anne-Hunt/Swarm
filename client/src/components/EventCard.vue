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

// const categoryIcon = computed(()=> {
//     if(event.type == categoryType.type )
//   return categoryType.icon)

// const icons = computed(()=>{
//     switch(eventProps.event.type){
//         case 'digital':
//             return `${mdi mdi-television}`
//         case 'convention':
//             return `${mdi mdi-earth}`
//         case 'concert':
//             return `${mdi mdi-music}`
//         case 'sport':
//             return `${mdi mdi-soccer}`
//         case 'meeting':
//             return `${mdi mdi-group}`
//     }
// })

// const categoryType = [
//   {
//     type: 'digital',
//     icon: 'mdi mdi-television text-light'
//   },
//   {
//     type: 'convention',
//     icon: 'mdi mdi-earth text-primary'
//   },
//   {
//     type: 'concert',
//     icon: 'mdi mdi-music text-secondary'
//   },
//   {
//     type: 'sport',
//     icon: 'mdi mdi-soccer text-warning'
//   },
//   {
//     type: 'meeting',
//     icon: 'mdi mdi-group text-danger'
//   }
// ]

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
    height: 15dvh;
}

.bgcolor{
    background-color: v-bind(colorType);
}
</style>