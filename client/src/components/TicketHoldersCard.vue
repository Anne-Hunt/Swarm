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
    <div class="row">
        <div class="col-3">
            <img class="ticketHolder rounded-circle border border-2" :src="ticket.profile?.picture" :alt="ticket.profile?.name">
        </div>
        <div class="col-8">
            <span><strong>{{ ticket.profile?.name }}</strong></span>
        </div>
    </div>
</RouterLink>
</template>


<style lang="scss" scoped>
.ticketHolder{
    height: 25px;
    width: 25px;
    object-fit: cover;
    object-position: center;
}
</style>