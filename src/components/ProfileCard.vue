<template>
  <section class="row">
    <div class="col-11 light-brown-bg rounded shadow m-3">
      <div class="d-flex flex-column">
        <div class="profileCard-coverImg mt-3">
          <img :src="profileProp.picture" :alt="profileProp.name" class="rounded-circle profile-picture">
        </div>
        <!-- /// //TODO: Add title tags to everything and make sure all profile aspects are on here -->
        <div class="fs-1 d-flex justify-content-end">
          <a v-if="profileProp.github" :href="profileProp.github" :title="`${profileProp.name}'s GitHub`"><i
              class="mdi mdi-github mx-3"></i></a>
          <a v-if="profileProp.linkedin" :href="profileProp.linkedin"><i class="mdi mdi-linkedin mx-3"></i></a>
          <a v-if="profileProp.resume" :href="profileProp.resume"><i class="mdi mdi-text-box-outline mx-3"></i></a>
        </div>
        <div class="mt-5 ms-5">
          <p>{{ profileProp.class }}
            <i v-if="profileProp.graduated" class="grad-icon mdi mdi-account-school"
              :title="`${profileProp.name} has graduated!`"></i>
            <i v-else class="grad-icon mdi mdi-chair-school"
              :class="[profileProp.class ? 'margin-class' : 'margin-noclass']"
              :title="`${profileProp.name} has not graduated yet!`"></i>
          </p>
        </div>
        <div class="m-2">
          <p class="fs-1">{{ profileProp.name }}</p>
          <p>{{ profileProp.bio }}</p>
        </div>
        <router-link v-if="profileProp.id == account.id" :to="{ name: 'Account' }">
          <button class="btn btn-theme mb-3">Edit Account Information</button>
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
  margin-top: 20%;
  margin-left: 3%;
}

.grad-icon {
  border: 2px solid var(--themeGreen1);
  border-radius: 50%;
  padding: 10px;
  font-size: 16pt;
}

.margin-class {
  margin-left: 5px;
}

.margin-noclass {
  margin-left: 150px;
}



@media (max-width: 768px) {
  .margin-class {
    margin-left: 5px;
  }

  .margin-noclass {
    margin-left: 100px;
  }

  .profile-picture {
    width: 180px;
    height: 180px;
    object-fit: cover;
    margin-top: 60%;
    margin-left: 3%;
  }
}
</style>