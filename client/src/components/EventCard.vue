<script setup>
import { computed } from 'vue';
import { Event } from '../models/Event.js';

const eventProps = defineProps({event: {type: Event, required: true}})

const eventimage = computed(()=> `url(${eventProps.event.coverImg})`)

</script>


<template>
        <RouterLink :to="{name: 'Event Details', params: {eventId: event.id}}">
            <div class="card rounded">
                <div class="card-image eventimage text-end">
                    <span class="bg-light">{{ event.type }}</span>
                </div>
                <div class="card-body">
                    <div class="card-title"><strong>{{ event.name }}</strong></div>
                    <div class="card-subtitle"><span>Hosted by {{ event.creator.name }}</span></div>
                    <div class="card-description">
                        <span>{{ event.startDate }} - {{ event.location }}</span><br>
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
</style>