<script setup>
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';

defineProps({event: Event})

</script>


<template>
    <div class="row">
        <div class="col-8">
            <h2>{{ event.name }} </h2>
            <span class="rounded-pill bg-primary">{{ event.type }}</span>
        </div>
        <div v-if="AppState.account" class="col-4">
            <button class="btn btn-primary"><i class="mdi mdi-dots-horizontal fs-1"></i></button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <p>You know what? It is beets. I've crashed into a beet truck. Must go faster. Yeah, but your scientists
                were so preoccupied with whether or not they could, they didn't stop to think if they should. Yes, Yes,
                without the oops! Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the
                tourists.Yes, Yes, without the oops! Hey, take a look at the earthlings. Goodbye! We gotta burn the rain
                forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet
                enough, they won't want it anymore! What do they got in there? King Kong?
            </p>
            <h4>Date and Time</h4>
            <span>{{ event.startDate }} at {{ event.time }}</span>
            <h4>Location</h4>
            <span>{{ event.location }}</span>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>