<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div v-if="account" class="col-12">
    <AccountCard :accountProp="account" />
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import { profilesService } from "../services/ProfilesService.js";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    onMounted(() =>
      profilesService.clearData(),
      // setActiveProfile()
    )

    onUnmounted(() => {
      AppState.activeProfile = null;
    })

    // async function setActiveProfile() {
    //   try {
    //     await accountService.setActiveProfile()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }

    return {
      account: computed(() => AppState.account),
      // activeProfile: computed(() => AppState.activeProfile)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
