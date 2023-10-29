<template>
  <form @submit.prevent="writePost()">
    <div>
      <label for="body" class="form-label">Your Post</label>
      <textarea cols="10" type="text" v-model="editable.body" class="form-control" id="body" required
        aria-describedby="body" />
    </div>
    <div>
      <label for="imgUrl" class="form-label">Add an image! (optional)</label>
      <input type="url" v-model="editable.imgUrl" class="form-control" id="imgUrl" aria-describedby="imgUrl" />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <button class="btn btn-theme my-3" type="submit">Post</button>
      <div class="d-flex btn-theme align-items-center" title="Close text box">
        <p class="m-0 p-0" role="button" @click="flipWantsToSee()"><i class="fs-2 mdi mdi-trash-can-outline"></i><i
            class="fs-1 mdi mdi-arrow-up"></i></p>
      </div>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"

export default {
  setup() {
    const editable = ref({})

    function flipWantsToSee() {
      let wantsToSee = AppState.wantsToSeeForm
      wantsToSee = !wantsToSee
      AppState.wantsToSeeForm = wantsToSee
    }

    return {
      editable,
      flipWantsToSee,

      async writePost() {
        try {
          let postContent = editable.value
          await postsService.writePost(postContent)
          flipWantsToSee()
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },

    }
  }
};
</script>


<style lang="scss" scoped></style>