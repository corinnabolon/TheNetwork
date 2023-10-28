<template>
  <div class="container-fluid">
    <section class="row">
      <div v-if="activeProfile" class="col-12">
        <ProfileCard :profileProp="activeProfile" />
      </div>
      <div v-if="posts.length">
        <div v-for="post in posts" :key="post.id" class="col-12">
          <PostCard :postProp="post" />
        </div>
      </div>
      <div class="col-12 d-flex justify-content-around mt-3 mb-4">
        <button @click="changePage(previous)" :disabled="!previous" class="btn btn-success"><i
            class="mdi mdi-arrow-left"></i>Previous 20 Posts</button>
        <button @click="changePage(next)" :disabled="!next" class="btn btn-success">Next 20 Posts<i
            class="mdi mdi-arrow-right"></i></button>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { computed, onMounted } from "vue";
import { profilesService } from "../services/ProfilesService.js"
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"


export default {
  setup() {
    onMounted(() => {
      profilesService.clearData();
      getProfileFromUrl();
      getPostsWithProfileId();
    })

    const route = useRoute();

    async function getProfileFromUrl() {
      try {
        let profileId = route.params.profileId;
        await profilesService.getProfileFromUrl(profileId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getPostsWithProfileId() {
      try {
        let profileId = route.params.profileId;
        logger.log(profileId)
        await profilesService.getPostsWithProfileId(profileId)
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      previous: computed(() => AppState.previousPage),
      next: computed(() => AppState.nextPage),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>