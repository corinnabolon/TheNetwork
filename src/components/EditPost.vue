<template>
  Edit template here
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";

export default {
  props: { postProp: { type: Post, required: true } },

  setup() {
    return {
      posts: computed(() => AppState.posts),
    }
  }
};
</script>


<style lang="scss" scoped></style>