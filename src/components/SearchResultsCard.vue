<template>
  <div class="component">

    {{ searchResultsProp.name }}
  </div>
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


<style lang="scss" scoped></style>