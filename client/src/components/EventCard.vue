<script setup>
import { computed } from 'vue';
import { Event } from '../models/Event.js';

const eventProps = defineProps({event: {type: Event, required: true}})

const bgStyle = computed(()=> `url(${eventProps.event.coverImg})`)

</script>


<template>
    <div class="col-3">
        <div class="card rounded">
            <div class="card-image eventimage" :style="`--bg-img: url(${event.coverImg})`">
        
            </div>
            {{ event.name }}
        </div>
    </div>
</template>


<style lang="scss" scoped>
.eventimage{
    background-image: var(--bg-image);
    background-position: center;
    background-size: cover;
    height: 15dvh;
}
</style>