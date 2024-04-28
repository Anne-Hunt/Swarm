<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="about text-center">
    <div v-if="account" class="row">
      <div class="col-md-6 col-12 p-2">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="col-md-6 col-12 p-2">
        <form @click="updateAccount">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              name="formId1"
              id="formId1"
              placeholder=""
              v-model="account.picture"
            />
            <label for="formId1">Name</label>
          </div>
          
        </form>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
