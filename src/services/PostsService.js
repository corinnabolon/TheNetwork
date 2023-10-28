import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PostsService {

  async getPosts() {
    AppState.activeProfile = null
    const res = await api.get("api/posts")
    let newPosts = res.data.posts.map((postPOJO) => new Post(postPOJO))
    AppState.posts = newPosts
    logger.log("Got posts", res.data)
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
    logger.log("Liked?", res.data)
    let updatedPost = new Post(res.data)
    let postIndex = AppState.posts.findIndex(post => post.id == postId)
    if (postIndex == -1) { return }
    AppState.posts.splice(postIndex, 1, updatedPost)
  }

  async changePage(url) {
    const res = await api.get(url)
    let newPosts = res.data.posts.map((POJO) => new Post(POJO))
    AppState.posts = newPosts;
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

}

export const postsService = new PostsService()