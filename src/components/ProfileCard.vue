<template>
  <section class="row">
    <div class="col-11 bg-light rounded shadow m-3">
      <div class="d-flex flex-column">
        <div class="profileCard-coverImg">
          <img :src="profileProp.picture" :alt="profileProp.name" class="rounded-circle profile-picture">
        </div>
        <!-- /// //TODO: Add title tags to everything and make sure all profile aspects are on here -->
        <div class="fs-1 d-flex justify-content-end">
          <a v-if="profileProp.github" :href="profileProp.github" :title="`${profileProp.name}'s GitHub`"><i
              class="mdi mdi-github mx-3"></i></a>
          <a v-if="profileProp.linkedin" :href="profileProp.linkedin"><i class="mdi mdi-linkedin mx-3"></i></a>
          <a v-if="profileProp.resume" :href="profileProp.resume"><i class="mdi mdi-text-box-outline mx-3"></i></a>
        </div>
        <div class="mt-5">
          <p>{{ profileProp.class }} <i v-if="profileProp.graduated" class="mdi mdi-book"
              :title="`${profileProp.name} has graduated!`"></i></p>
          <p class="fs-1">{{ profileProp.name }}</p>
        </div>
        <div>
          <p>{{ profileProp.bio }}</p>
        </div>
        <router-link v-if="profileProp.id == account.id" :to="{ name: 'Account' }">
          <button class="btn btn-success">Edit Account Information</button>
        </router-link>
      </div>
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import { Profile } from "../models/Profile.js";
import { AppState } from '../AppState';

export default {
  props: { profileProp: { type: Profile, required: true } },

  setup(props) {
    return {
      account: computed(() => AppState.account),
      profileCoverImg: computed(() => `url(${props.profileProp.coverImg})`)

    }
  }
};
</script>


<style lang="scss" scoped>
.profileCard-coverImg {
  background-image: v-bind(profileCoverImg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
}

.profile-picture {
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin-top: 25%;
  margin-left: 4%;
}
</style>