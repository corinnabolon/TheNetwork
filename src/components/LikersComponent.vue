<template>
  <div class="modal" id="LikersModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content themeBg">
        <div class="modal-header">
          <p class="modal-title fs-4 font-themeGreen agbalumo">Likers of This Post</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="resetAppStateLikers()" title="Close"></button>
        </div>
        <div class="modal-body">
          <p class="list">{{ likers }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {

    return {
      likers: computed(() => AppState.likers),

      resetAppStateLikers() {
        profilesService.resetAppStateLikers();
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.list {
  white-space: pre-line;
}
</style>