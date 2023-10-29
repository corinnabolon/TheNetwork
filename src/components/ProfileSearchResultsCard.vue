<template>
  <router-link :to="{ name: 'Profile', params: { profileId: searchResultsProp.id } }">
    <div class="col-12 light-brown-bg text-dark rounded shadow my-3 d-flex"
      :title="`${searchResultsProp.name}'s Profile`">
      <img :src="searchResultsProp.picture" :alt="searchResultsProp.name" class="rounded-circle profile-picture">
      <div class="ms-5 mt-3">
        <p class="fs-5 mb-0">{{ searchResultsProp.class }}</p>
        <p class="fs-1">{{ searchResultsProp.name }}</p>
      </div>
    </div>
  </router-link>
</template>


<script>
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import { Profile } from "../models/Profile.js";

export default {
  props: { searchResultsProp: { type: Profile, required: true } },

  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.profile-picture {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 20px;
}
</style>