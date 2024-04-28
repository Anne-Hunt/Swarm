<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Profile } from '../models/Profile.js';
import { Ticket } from '../models/Ticket.js';


const props = defineProps({ticket: Ticket, profile: Profile})

</script>


<template>
<div>
 <img class="ticketHolder rounded-circle border border-2" :src="ticket.profile?.picture" :alt="ticket.profile?.name"> <span><strong>{{ ticket.profile?.name }}</strong></span> 
</div>
</template>


<style lang="scss" scoped>
.ticketHolder{
    max-height: 30px;
    width: 30px;
}
</style>