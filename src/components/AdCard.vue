<template>
  <div v-if="ads.length">
    <img :src="ads[0].tall" alt="an ad" class="img-fluid ad-height my-3">
    <img :src="ads[1].tall" alt="an ad" class="img-fluid ad-height my-3">
  </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { adsService } from "../services/AdsService.js";
import Pop from "../utils/Pop.js";
import { computed, onMounted } from 'vue';


export default {
  setup() {
    onMounted(() => {
      getAds();
    })


    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      ads: computed(() => AppState.ads)
    }
  }
};
</script>


<style lang="scss" scoped>
.ad-height {
  max-height: 100vh;
}
</style>