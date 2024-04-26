<script setup>
// import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid m-0 p-0">
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    <h5><i class="mdi mdi-copyright"></i> Raccoon Synthesizer</h5>
  </footer>
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
