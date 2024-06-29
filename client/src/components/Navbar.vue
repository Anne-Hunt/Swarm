<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

</script>

<template>
  <div class="container-fluid p-0 m-0">

    <nav class="navbar navbar-expand-sm navbar-dark bg-primary shadow">
      <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex flex-column text-bottom front">
            <div class="rounded-circle border border-5 border-success mt-2 shadow">
              <div class="rounded-circle border border-light bg-primary fontpop">
                <i class="mdi mdi-bee fs-1 p-2"></i>
              </div>
            </div>
          </div>
        </router-link>
      <div class="collapse navbar-collapse px-0" id="navbarText">
        <ul class="navbar-nav me-auto d-flex align-items-center">
          <li>
            <button class="btn text-light fs-3 fontpop" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i class="mdi" :class="theme == 'light' ? 'mdi-lightbulb' : 'mdi-lightbulb-outline'"></i>
          </button>
          </li>
          <li>
            <Login />
          </li>
        </ul>
    </div>
    </div>
</nav>
</div>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}

.fontfix{
  text-shadow: 1px 1px 4px black;
}

.fontpop{
  text-shadow: 1px 1px 2px black;
}

.front{
  z-index: 2;
}
</style>
