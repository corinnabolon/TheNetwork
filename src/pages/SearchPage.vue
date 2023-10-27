<template>
  <div>
    <form @submit.prevent="searchProfiles()">
      <div class="mb-3">
        <label for="searchProfiles" class="form-label">Profile Search</label>
        <input v-model="editable" type="text" class="form-control" id="searchProfiles">
        <div class="form-text">Search through profile names.</div>
      </div>
      <button :disabled="editable == ''" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  <div v-for="profile in searchedProfiles" :key="profile.id">
    <SearchResultsCard :searchResultsProp="profile" />
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { profilesService } from "../services/ProfilesService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    onMounted(() => {
      profilesService.clearData();
    })

    const editable = ref("")

    return {
      editable,
      searchedProfiles: computed(() => AppState.searchedProfiles),

      async searchProfiles() {
        try {
          let searchQuery = editable.value
          await profilesService.searchProfiles(searchQuery)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>