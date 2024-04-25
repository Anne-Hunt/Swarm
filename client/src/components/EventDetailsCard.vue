<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Event } from '../models/Event.js';

const event = computed(()=> AppState.activeEvent)
</script>


<template>
    <div class="row">
        <div class="col-8">
            <h2>{{ event?.name }} </h2>
            <span class="rounded-pill bg-primary">{{ event.type }}</span>
        </div>
        <div v-if="AppState.account" class="col-4">
            <button class="btn btn-primary"><i class="mdi mdi-dots-horizontal fs-1"></i></button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <p> {{ event.description }}
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