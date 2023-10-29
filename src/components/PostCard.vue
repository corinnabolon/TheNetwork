<template>
  <section class="row align-items-center">
    <div class="col-12 col-md-11 light-brown-bg rounded shadow justify-content-around my-3 mx-5 px-5 py-3">
      <router-link v-if="!activeProfile" :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }">
        <div class="d-flex">
          <img :src="postProp.creator.picture" :alt="postProp.creator.name" class="rounded-circle user-image">
          <p class="ms-2">{{ postProp.creator.name }}</p>
        </div>
      </router-link>
      <div class="col-12">
        <div :class="[postProp.creator.id == account.id ? 'own-post-border' : 'post-border']"
          class="mt-2 d-flex flex-column">
          <p class="m-2 mb-3">{{ postProp.body }}</p>
          <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="Post Image"
            class="img-fluid align-self-center rounded mb-3">
        </div>
        <div class="d-flex justify-content-between mt-3">
          <div class="align-self-end">
            <p class="mb-0 pb-0">Published: {{ postProp.createdAt }}</p>
            <p v-if="postProp.createdAt != postProp.updatedAt">Last Updated: {{ postProp.updatedAt }}</p>
          </div>
          <div class="d-flex fs-3">
            <div v-if="!account.id">
              <i role="button" @click="sendToLogin()" class="mdi mdi-heart-outline heart-theme"></i>
            </div>
            <div v-else>
              <div>
                <i v-if="isLikedByAccount" role="button" @click="likePost(postProp.id)"
                  class="mdi mdi-heart heart-theme"></i>
                <i v-else role="button" @click="likePost(postProp.id)" class="mdi mdi-heart-outline heart-theme"></i>
              </div>
            </div>
            <p v-if="postProp.likes.length >= 1" class="number-theme">{{ postProp.likes.length }}</p>
          </div>
        </div>
        <div v-if="postProp.creator.id == account.id">
          <button @click="deletePost()" class="btn btn-danger my-3">Delete Post</button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { computed } from 'vue';
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { AuthService } from '../services/AuthService'

export default {
  props: { postProp: { type: Post, required: true } },

  setup(props) {

    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      isLikedByAccount: computed(() =>
        props.postProp.likeIds.includes(AppState.account.id)
      ),

      async likePost(postId) {
        try {
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
      },

      async deletePost() {
        try {
          let wantsToDelete = await Pop.confirm("Are you sure you want to delete this post?")
          if (!wantsToDelete) {
            return
          }
          let postId = props.postProp.id
          await postsService.deletePost(postId)
        } catch (error) {
          Pop.error(error)
        }
      },


      async sendToLogin() {
        AuthService.loginWithPopup()
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

.heart-theme {
  color: var(--themeGreen1);
}

.heart-theme:hover {
  color: var(--themeGreen2);
}

.number-theme {
  color: var(--themeGreen1);
}

.post-border {
  border: 2px solid var(--themeBrown);
  border-radius: 25px;
  padding: .5rem;
}

.own-post-border {
  border: 2px solid var(--themeGreen1);
  border-radius: 25px;
  padding: .5rem;
}
</style>