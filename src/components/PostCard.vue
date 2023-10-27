<template>
  <section class="row align-items-center bg-light rounded shadow justify-content-around my-3">
    <div class="col-10">
      <!-- <router-link v-if="!activeBlogger" :to="{ name: 'Blog', params: { userId: blogProp.creator.id } }"> -->
      <div class="d-flex">
        <img :src="postProp.creator.picture" :alt="postProp.creator.name" class="rounded-circle user-image">
        <p>{{ postProp.creator.name }}</p>
      </div>
      <!-- </router-link> -->
      <div class="col-12">
        <p>Published: {{ postProp.createdAt }} Last Updated: {{ postProp.updatedAt }}</p>
        <p>{{ postProp.body }}</p>
        <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="Post Image" class="img-fluid">
        <div>
          <i v-if="isLikedByAccount" role="button" @click="likePost(postProp.id)" class="mdi mdi-heart"></i>
          <i v-else role="button" @click="likePost(postProp.id)" class="mdi mdi-heart-outline"></i>
        </div>
        <p v-if="postProp.likes.length >= 1">{{ postProp.likes.length }}</p>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { computed } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"

export default {
  props: { postProp: { type: Post, required: true } },

  setup(props) {

    return {
      userLikes,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      isLikedByAccount: computed(() =>
        props.postProp.likeIds.includes(AppState.account.id)
      ),

      async likePost(postId) {
        try {
          logger.log("Liked this post!", postId)
          await postsService.likePost(postId)
          let targetPost = AppState.posts.find(post => post.id == postId)
          if (!targetPost) {
            return
          }
          if (targetPost.likeIds.includes(AppState.account.id)) {
            Pop.success("You have liked this post!")
          } else {
            Pop.success("You have unliked this post.")
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.user-image {
  height: 5vh;
  width: 5vh;
  object-fit: cover;
}
</style>