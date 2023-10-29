<template>
  <div class="modal" id="EditPostModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content themeBg">
        <div class="modal-header">
          <p class="modal-title fs-4 font-themeGreen agbalumo">Edit Your Post</p>
          <button @click="resetEditableValue()" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editPost()">
            <div>
              <label for="body" class="form-label">Your Post</label>
              <textarea cols="10" type="text" v-model="editable.body" class="form-control" id="body" required
                aria-describedby="body" />
            </div>
            <div>
              <label for="imgUrl" class="form-label mt-3">Add an image! (optional)</label>
              <input type="url" v-model="editable.imgUrl" class="form-control" id="imgUrl" aria-describedby="imgUrl" />
            </div>
            <div class="mt-4 d-flex justify-content-end">
              <button @click="resetEditableValue()" type="button" class="btn btn-theme2 me-4"
                data-bs-dismiss="modal">Cancel Edit</button>
              <button type="submit" class="btn btn-theme-danger">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, reactive, onMounted, watchEffect } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { Modal } from 'bootstrap';
import { postsService } from "../services/PostsService.js";


export default {
  // props: { editPostProp: { type: Post, required: true } },

  setup() {
    let editable = ref({})

    watchEffect(() => {
      if (AppState.activePost) {
        editable.value = { ...AppState.activePost }
        logger.log('WATCH')
      }
      else {
        editable.value = {}
      }
    })

    function resetEditableValue() {
      editable.value = { ...AppState.activePost }
    }

    return {
      editable,
      resetEditableValue,
      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.posts),

      async editPost() {
        try {
          logger.log("ActivePost from EditPostComponent", AppState.activePost)
          let activePost = AppState.activePost
          activePost = editable.value
          logger.log(editable.value)
          await postsService.editPost(activePost)
          Modal.getOrCreateInstance('#EditPostModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
textarea {
  height: 30vh;
}
</style>