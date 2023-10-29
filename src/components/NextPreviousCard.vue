<template>
  <div class="col-12 d-flex justify-content-around mt-3 mb-4">
    <button @click="changePage(previous)" :class="[!previous ? 'hidden' : '']" :disabled="!previous"
      class="btn btn-theme"><i class="mdi mdi-arrow-left"></i>Previous 20 Posts</button>
    <button @click="changePage(next)" :class="[!next ? 'hidden' : '']" :disabled="!next" class="btn btn-theme">Next 20
      Posts<i class="mdi mdi-arrow-right"></i></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";


export default {
  setup() {

    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    return {
      previous: computed(() => AppState.previousPage),
      next: computed(() => AppState.nextPage),

      async changePage(url) {
        try {
          await postsService.changePage(url)
          scrollToTop()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}
</style>