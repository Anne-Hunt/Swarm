<script setup>
import { AppState } from '../AppState.js';
import { Ticket } from '../models/Ticket.js';
import { profileService } from '../services/ProfileService.js';
import Pop from '../utils/Pop.js';

defineProps({ticket: Ticket})

async function setActiveProfile(profile){
    try {
      AppState.activeProfile = profile
    }
    catch (error){
      Pop.error("Unable to make profile active", 'error');
    }
}

</script>


<template>
<RouterLink :to="{name: 'Profile', params: {profileId: ticket.accountId}}" @click="setActiveProfile(ticket.profile)">
    <div class="row align-items-center mb-2">
        <div class="col-3">
            <img class="ticketHolder rounded-circle border border-2 shadow" :src="ticket.profile?.picture" :alt="ticket.profile?.name">
        </div>
        <div class="col-8 text-primary">
            <span><strong>{{ ticket.profile?.name }}</strong></span>
        </div>
    </div>
</RouterLink>
</template>


<style lang="scss" scoped>
.ticketHolder{
    height: 30px;
    width: 30px;
    object-fit: cover;
    object-position: center;
}
</style>