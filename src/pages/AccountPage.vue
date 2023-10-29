<template>
  <div class="about text-center font-themeGreen">
    <p class="fs-1 agbalumo mt-2">Welcome {{ account.name }}!</p>
    <p class="fs-3">You can edit your account information below.</p>
    <img class="rounded" :src="account.picture" alt="" />
    <p class="fs-4 fw-bold mt-2">{{ account.email }}</p>
    <router-link :to="{ name: 'Profile', params: { profileId: `${account.id}` } }">
      <button class="btn btn-theme">Go To Your Profile Page</button>
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
