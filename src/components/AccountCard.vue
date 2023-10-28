<template>
  <section v-if="account" class="row">
    <div class="col-11 bg-light rounded shadow m-3">
      <form @submit.prevent="editAccount()">
        <div class="d-flex flex-column">
          <div class="accountCard-coverImg">
            <label for="coverImg" class="form-label">Cover Image URL</label>
            <input type="url" v-model="editable.coverImg" class="form-control" id="coverImg"
              aria-describedby="coverImg" />
            <img :src="accountProp.picture" :alt="accountProp.name" class="rounded-circle account-picture">
          </div>
          <!-- /// //TODO: Add title tags to everything and make sure all account aspects are on here -->
          <div>
            <label for="picture" class="form-label">Profile Image URL</label>
            <input type="url" v-model="editable.picture" class="form-control" id="picture" aria-describedby="picture" />
          </div>
          <div class="d-flex align-items-center">
            <div>
              <label for="class" class="form-label">Attending Class</label>
              <input type="text" v-model="editable.class" class="form-control" id="class" aria-describedby="class" />
            </div>
            <div class="ms-5">
              <label for="graduated">Check if Graduated</label>
              <input v-model="editable.graduated" class="checkbox ms-2" id="graduated" type="checkbox" name="graduated"
                checked>
            </div>
          </div>
          <div>
            <div>
              <label for="github" class="form-label">Github</label>
              <input type="url" v-model="editable.github" class="form-control" id="github" aria-describedby="github" />
            </div>
            <div>
              <label for="linkedin" class="form-label">LinkedIn</label>
              <input type="url" v-model="editable.linkedin" class="form-control" id="linkedin"
                aria-describedby="linkedin" />
            </div>
            <div>
              <label for="resume" class="form-label">Resume</label>
              <input type="url" v-model="editable.resume" class="form-control" id="resume" aria-describedby="resume" />
            </div>
          </div>
          <div>
            <div>
              <label for="bio" class="form-label">Bio</label>
              <textarea cols="5" type="text" v-model="editable.bio" class="form-control" id="bio"
                aria-describedby="bio" />
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit Changes</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
// import { Account } from "../models/Account.js";
import { AppState } from '../AppState';
import { computed, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { useRouter } from "vue-router";
import { profilesService } from "../services/ProfilesService.js";

export default {
  props: { accountProp: { type: Object, required: true } },

  setup(props) {
    const editable = ref({});
    const router = useRouter();

    watchEffect(() => {
      if (AppState.account) {
        editable.value = { ...AppState.account }
      }
      else {
        editable.value = {}
      }
    })

    return {
      editable,
      accountCoverImg: computed(() => `url(${props.accountProp.coverImg})`),
      // activeProfile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),

      async editAccount() {
        try {
          let editedData = editable.value
          logger.log("Editing account data", editedData)
          await accountService.editAccount(editedData)
          profilesService.clearData()
          Pop.success("Account edits saved!")
          router.push({ name: 'Profile', params: { profileId: AppState.account.id } });
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.accountCard-coverImg {
  background-image: v-bind(accountCoverImg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300px;
}

.account-picture {
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin-top: 25%;
  margin-left: 4%;
}
</style>