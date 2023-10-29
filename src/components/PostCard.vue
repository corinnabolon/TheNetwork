<template>
  <section class="row align-items-center">
    <div class="col-12 col-md-11 light-brown-bg rounded shadow justify-content-around my-3 mx-5 px-5 py-3">
      <router-link v-if="!activeProfile" :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }">
        <div class="d-flex" :title="`${postProp.creator.name}'s Profile`">
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
              <i role="button" title="Login to like a post" @click="sendToLogin()"
                class="mdi mdi-heart-outline heart-theme"></i>
            </div>
            <div v-else>
              <div>
                <i v-if="isLikedByAccount" title="Click to unlike this post" role="button" @click="likePost(postProp.id)"
                  class="mdi mdi-heart heart-theme"></i>
                <i v-else role="button" title="Click to like this post" @click="likePost(postProp.id)"
                  class="mdi mdi-heart-outline heart-theme"></i>
              </div>
            </div>
            <p v-if="postProp.likes.length >= 1" class="number-theme" role="button" @click="findLikers()"
              data-bs-toggle="modal" data-bs-target="#LikersModal" :title=likeString>{{
                postProp.likes.length }}</p>
          </div>
        </div>
        <div v-if="postProp.creator.id == account.id">
          <button @click="deletePost()" class="btn btn-theme-danger my-3">Delete Post</button>
          <button @click="setActivePost()" title="Open Edit Form" data-bs-toggle="modal" data-bs-target="#EditPostModal"
            class="btn btn-theme2
            ms-5">Edit Post</button>
        </div>
      </div>
    </div>
    <EditPostComponent />
  </section>
  <LikersComponent />
</template>


<script>
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { computed, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { AuthService } from '../services/AuthService'
import { profilesService } from "../services/ProfilesService.js"

export default {
  props: { postProp: { type: Post, required: true } },

  setup(props) {
    let likerList = ref('')
    let likeString = ref("Click to see who liked this post")

    return {
      likerList,
      likeString,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      activePost: computed(() => AppState.activePost),
      searchedProfiles: computed(() => AppState.searchedProfiles),
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
          this.findLikers()
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
          Pop.success("Post deleted.")
        } catch (error) {
          Pop.error(error)
        }
      },

      setActivePost() {
        let postId = props.postProp.id
        postsService.setActivePost(postId)
      },

      async sendToLogin() {
        AuthService.loginWithPopup()
      },

      async findLikers() {
        try {
          profilesService.resetAppStateLikers()
          let postId = props.postProp.id
          let foundPost = AppState.posts.find((post) => postId == post.id)
          let likers = foundPost.likeIds
          for (let i = 0; i < likers.length; i++) {
            await profilesService.findLikers(likers[i])
          }
          likerList.value = ''
          AppState.searchedProfiles.forEach((profile) =>
            likerList.value += (profile.name + '\n')
          )
          likeString.value = likerList.value
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