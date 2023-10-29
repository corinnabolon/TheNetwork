<template>
  <div class="about text-center font-themeGreen">
    <p class="fs-1 agbalumo mt-2">Welcome {{ account.name }}!</p>
    <p class="fs-3">You can edit your account information below.</p>
    <img class="rounded" :src="account.picture" alt="" />
    <p class="fs-4 fw-bold mt-2">{{ account.email }}</p>
    <router-link :to="{ name: 'Profile', params: { profileId: `${account.id}` } }">
      <button class="btn btn-theme" title="Profile Page">Go To Your Profile Page</button>
    </router-link>
  </div>
  <div v-if="account" class="col-12">
    <AccountCard :accountProp="account" />
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {
    onMounted(() =>
      profilesService.clearData(),
    )

    onUnmounted(() => {
      AppState.activeProfile = null;
    })


    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
