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

.colors{
  color: rgb(126, 27, 198, 1);
  color: rgb(12, 188, 135, 1);
  color: rgb(247, 195, 46, 1);
  color: rgb(33, 190, 214, 1);
  color: rgb(214, 41, 62, 1);
  color: rgb(47, 255, 154, 1);
  color: rgb(170, 73, 249, 1);
  color: rgb(255, 218, 107, 1);
  color: rgb(124, 119, 224, 1);
  color: rgb(234, 134, 143, 1);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
