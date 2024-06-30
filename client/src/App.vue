<script setup>
// import { AppState } from './AppState'
// import { onMounted } from 'vue';
// import { AppState } from './AppState.js';
import Navbar from './components/Navbar.vue'
// import { ticketService } from './services/TicketService.js';
// import { logger } from './utils/Logger.js';

// async function getAllTickets(){
//   try {
//       if (AppState.account != null) {
//       await ticketService.getAllTickets()
//         const tickets = AppState.tickets.filter(ticket => AppState.activeEvent.id == ticket.eventId)
//         AppState.eventTickets = tickets
//         const userTickets = AppState.tickets.filter(ticket => AppState.account.id == ticket.accountId)
//         AppState.usersTickets = userTickets}
//       else return
//   } catch (error) {
//       // Pop.toast('unable to get all tickets', 'error')
//         logger.log('unable to get all tickets on app.vue', error)
//   }
// }

// onMounted(()=>{
//   getAllTickets()
// })

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
