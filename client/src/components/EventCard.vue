<script setup>
import { Event } from '../models/Event.js';


defineProps({event: Event})
</script>


<template>
<div>
    {{ event.name }}
</div>
</template>


<style lang="scss" scoped>

</style>