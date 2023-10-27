<template>
  <div v-if="ads.length">
    <div v-for="ad in  ads " :key="ad.title" class="col-12">
      <a :href="`https://${ad.linkURL}`"><img :src="ad.tall" alt="an ad" class="img-fluid ad-height my-3"></a>
    </div>
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