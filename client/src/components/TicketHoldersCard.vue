<script setup>
import { Ticket } from '../models/Ticket.js';

defineProps({ticket: Ticket})

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
    max-height: 25px;
}
</style>