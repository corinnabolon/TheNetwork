<template>
  <div class="container-fluid">
    <section class="row">
      <div v-if="activeProfile" class="col-12">
        <ProfileCard :profileProp="activeProfile" />
        <div v-if="posts.length">
          <div>
            <div v-if="account" class="agbalumo font-themeGreen mt-3">
              <p v-if="account.id == activeProfile.id" class="fs-1">Your Posts</p>
              <p v-else class="fs-1">{{ activeProfile.name }}'s Posts</p>
            </div>
            <div v-else>
              <p class="fs-1">{{ activeProfile.name }}'s Posts</p>
            </div>
          </div>
          <div v-if="account.id == activeProfile.id">
            <button @click="flipWantsToSee()" v-if="account" class="btn btn-theme mb-3" title="Make a new Post">Make a New
              Post</button>
            <div v-if="wantsToSee">
              <PostForm />
            </div>
          </div>
          <div v-for="post in posts" :key="post.id" class="col-9 col-md-12">
            <PostCard :postProp="post" />
          </div>
          <NextPreviousCard />
        </div>
        <div v-else>
          <button @click="flipWantsToSee()" v-if="account" class="btn btn-theme mb-3" title="Make a new Post">Make a New
            Post</button>
          <div v-if="wantsToSee">
            <PostForm />
          </div>
        </div>




      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { computed, onMounted, onUnmounted } from "vue";
import { profilesService } from "../services/ProfilesService.js"
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"


export default {
  setup() {
    onMounted(() => {
      profilesService.clearData();
      getProfileFromUrl();
      getPostsWithProfileId();
      scrollToTop();
    })

    function flipWantsToSee() {
      let wantsToSee = AppState.wantsToSeeForm
      wantsToSee = !wantsToSee
      AppState.wantsToSeeForm = wantsToSee
    }

    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    onUnmounted(() => {
      AppState.activeProfile = null;
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
        await profilesService.getPostsWithProfileId(profileId)
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      flipWantsToSee,
      wantsToSee: computed(() => AppState.wantsToSeeForm),
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      previous: computed(() => AppState.previousPage),
      next: computed(() => AppState.nextPage),
      account: computed(() => AppState.account),

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


<style lang="scss" scoped></style>