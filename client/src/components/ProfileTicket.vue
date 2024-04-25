<script setup>
import { Profile } from '../models/Profile.js';
import { Ticket } from '../models/Ticket.js';


defineProps({ticket: Ticket, profile: Profile})
</script>


<template>
<div><img :src="ticket.profile.picture" :alt="ticket.profile.name"><span>{{ ticket.profile.name }}</span></div>
</template>


<style lang="scss" scoped>

</style>