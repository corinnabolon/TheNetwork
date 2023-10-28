<template>
  <section class="row">
    <div v-if="account.id" class="col-12">
      <button @click="flipWantsToSee()" v-if="account" class="btn btn-success mt-3">Make a New Post</button>
      <div v-if="wantsToSee">
        <PostForm />
      </div>
    </div>
    <div v-for="post in posts" :key="post.id" class="col-12">
      <PostCard :postProp="post" />
    </div>
    <div class="col-12 d-flex justify-content-around mt-3 mb-4">
      <button @click="changePage(previous)" :disabled="!previous" class="btn btn-success"><i
          class="mdi mdi-arrow-left"></i>Previous 20 Posts</button>
      <button @click="changePage(next)" :disabled="!next" class="btn btn-success">Next 20 Posts<i
          class="mdi mdi-arrow-right"></i></button>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { AppState } from "../AppState.js"
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {

    onMounted(() => {
      profilesService.clearData();
      getPosts();
      scrollToTop();
    });

    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    function flipWantsToSee() {
      let wantsToSee = AppState.wantsToSeeForm
      wantsToSee = !wantsToSee
      AppState.wantsToSeeForm = wantsToSee
    }

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      flipWantsToSee,
      wantsToSee: computed(() => AppState.wantsToSeeForm),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
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

    };
  },
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
