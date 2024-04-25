<script setup>
import { computed } from 'vue';
import { Event } from '../models/Event.js';

const eventProps = defineProps({event: {type: Event, required: true}})

const eventimage = computed(()=> `url(${eventProps.event.coverImg})`)

</script>


<template>
    <div class="col-3">
        <RouterLink :to="{name: 'Event Details', params: {eventId: event.id}}">
            <div class="card rounded">
                <div class="card-image eventimage text-end">
                    <span class="bg-light">{{ event.type }}</span>
                </div>
                <div class="card-body">
                    <div class="card-title">{{ event.name }}</div>
                    <div class="card-subtitle"><span>Hosted by {{ event.creator.name }}</span></div>
                    <div class="card-description">
                        <p>{{ event.startDate }} - {{ event.location }}</p>
                        <p>{{ event.ticketCount }} people are going</p>
                    </div>
                </div>
            </div>
        </RouterLink>
        </div>
</template>


<style lang="scss" scoped>
.eventimage{
    background-image: v-bind(eventimage);
    background-position: center;
    background-size: cover;
    height: 15dvh;
}
</style>