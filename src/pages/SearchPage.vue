<template>
  <div>
    <form @submit.prevent="searchProfiles()">
      <div class="mb-3">
        <label for="searchProfiles" class="form-label">Profile Search</label>
        <input v-model="editable" type="text" class="form-control" id="searchProfiles">
        <div class="form-text">Search through profile names.</div>
      </div>
      <button :disabled="editable == ''" type="submit" class="btn btn-theme">Submit</button>
    </form>
  </div>
  <div>
    <form @submit.prevent="searchPosts()">
      <div class="mb-3">
        <label for="searchPosts" class="form-label">Posts Search</label>
        <input v-model="editable2" type="text" class="form-control" id="searchPosts">
        <div class="form-text">Search through posts.</div>
      </div>
      <button :disabled="editable2 == ''" type="submit" class="btn btn-theme">Submit</button>
    </form>
  </div>
  <div>
    <div v-if="haveSearchedProfiles">
      <div v-for="profile in searchedProfiles" :key="profile.id">
        <ProfileSearchResultsCard :searchResultsProp="profile" />
      </div>
    </div>
    <div v-else-if="haveSearchedPosts">
      <!-- <div v-for="post in searchedPosts" :key="post.id">
        <PostsSearchResultsCard :searchResultsProp="post" />
      </div> -->
      <div v-for="post in searchedPosts" :key="post.id" class="col-9 col-md-12">
        <PostCard :postProp="post" />
      </div>
      <NextPreviousCard />
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { profilesService } from "../services/ProfilesService.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";


export default {
  setup() {
    onMounted(() => {
      profilesService.clearData();
    })

    const editable = ref("")
    const editable2 = ref("")
    let haveSearchedProfiles = ref(false)
    let haveSearchedPosts = ref(false)

    return {
      editable,
      editable2,
      haveSearchedProfiles,
      haveSearchedPosts,
      searchedProfiles: computed(() => AppState.searchedProfiles),
      searchedPosts: computed(() => AppState.posts),

      async searchProfiles() {
        try {
          AppState.searchedProfiles = []
          haveSearchedProfiles.value = true
          haveSearchedPosts.value = false
          let searchQuery = editable.value
          await profilesService.searchProfiles(searchQuery)
          editable.value = ""
        } catch (error) {
          Pop.error(error)
        }
      },

      async searchPosts() {
        try {
          AppState.posts = []
          haveSearchedProfiles.value = false
          haveSearchedPosts.value = true
          let searchQuery = editable2.value
          await postsService.searchPosts(searchQuery)
          editable2.value = ""
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.btn-theme {
  background-color: var(--themeBrown);
  color: var(--themeTan);
  border: 2px solid var(--themeGreen2);
  font-size: 16pt;
}

.btn-theme:hover {
  background-color: var(--themeGreen2);
  color: var(--themeBrown);
  border: 2px solid var(--themeBrown);
}
</style>