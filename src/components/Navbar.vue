<template>
  <nav class="navbar navbar-expand-lg title-color px-3 agbalumo">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <!-- <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/cw-logo.png" height="45" />
      </div> -->
      <p class="title-color fw-bold fs-1 mb-0 pb-0 ms-3">Home</p>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Search' }" class="title-color fw-bold fs-1 mb-0 pb-0 ms-3">
            Search
          </router-link>
        </li>
        <li :class="[account.id ? '' : 'hidden']">
          <router-link :to="{ name: 'Profile', params: { profileId: `${account.id}` } }"
            class="title-color fw-bold fs-1 mb-0 pb-0 ms-3">
            My Profile
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Login from './Login.vue';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
