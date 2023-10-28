import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfilesService {

  async getProfileFromUrl(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
    logger.log(AppState.activeProfile)
  }

  async getPostsWithProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/posts`)
    let profilePosts = res.data.posts.map((postPOJO) => new Post(postPOJO))
    AppState.posts = profilePosts
    logger.log("Res.data", res.data)
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

  async searchProfiles(query) {
    const res = await api.get(`api/profiles?query=${query}`)
    AppState.searchedProfiles = res.data.map((POJO) => new Profile(POJO))
    logger.log(AppState.searchedProfiles)
  }

  clearData() {
    AppState.activeProfile = null
    AppState.searchedProfiles = []
    AppState.nextPage = null
    AppState.previousPage = null
  }

}

export const profilesService = new ProfilesService()