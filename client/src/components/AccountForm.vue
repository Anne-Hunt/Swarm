<script setup>
import { computed, ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';



const account = computed(() => AppState.account)

const formData = ref({
  name: account.value.name || '',
  picture: account.value.picture || '',
  email: account.value.email || ''
})

async function updateAccount(){
  try {
    const accountData = formData.value
    await accountService.updateAccount(accountData)
    Pop.success("Account updated!")
  }
  catch (error){
    Pop.error("Unable to updated at this time", 'error');
    logger.log("Unable to complete account update", error)
  }
}
</script>


<template>
<form @submit.prevent="updateAccount()">
    <div class="mb-3">
  <label for="name" class="form-label">Your Name</label>
  <input type="text" class="form-control" id="name" v-model="formData.name" :placeholder="account.name" :default="account.name">
</div><div class="mb-3">
  <label for="picture" class="form-label">Picture URL</label>
  <input type="url" class="form-control" id="picture" v-model="formData.picture" :placeholder="account.picture">
</div><div class="mb-3">
  <label for="emailaddress" class="form-label">Email address</label>
  <input type="email" class="form-control" id="emailaddress" v-model="formData.email" :placeholder="account.email" :default="account.email">
</div>
<button class="btn btn-success text-light" type="submit">SUBMIT</button>
</form>
</template>


<style lang="scss" scoped>

</style>