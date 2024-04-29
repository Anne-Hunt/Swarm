<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Profile } from '../models/Profile.js';
import { Ticket } from '../models/Ticket.js';


const props = defineProps({ticket: Ticket, profile: Profile})

</script>


<template>
<div class="row">
    <div class="col-3">
        <img class="ticketHolder rounded-circle border border-2" :src="ticket.profile?.picture" :alt="ticket.profile?.name">
    </div>
    <div class="col-8">
        <span><strong>{{ ticket.profile?.name }}</strong></span>
    </div>
</div>
</template>


<style lang="scss" scoped>
.ticketHolder{
    max-height: 15px;
    width: 15px;
}
</style>