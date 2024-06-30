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
<nav class="navbar navbar-lg bg-primary pt-0 shadow">
  <div class="container-fluid mt-0 pt-0">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
          <div class="text-light front">
            <div class="rounded-circle border border-5 border-success shadow">
              <div class="rounded-circle border border-light bg-primary fontpop">
                <i class="mdi mdi-bee fs-1 p-2"></i>
              </div>
            </div>
          </div>
      </router-link>
    <div class="d-flex align-items-center">
      <button class="btn text-light fs-3 py-0 fontpop" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i class="mdi" :class="theme == 'light' ? 'mdi-lightbulb' : 'mdi-lightbulb-outline'"></i>
      </button>
      <Login />
    </div>
  </div>
</nav>
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
    height: 75px;
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
