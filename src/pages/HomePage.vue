<template>
  <section class="row">
    <div v-for="post in posts" :key="post.id" class="col-12">
      <PostCard :postProp="post" />
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    onMounted(() => {
      getPosts();
    });


    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
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
