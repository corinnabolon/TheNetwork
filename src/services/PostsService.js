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
    logger.log("Got posts", AppState.posts)
  }

  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
    logger.log("Liked?", res.data)
    let updatedPost = new Post(res.data)
    let postIndex = AppState.posts.findIndex(post => post.id == postId)
    if (postIndex == -1) { return }
    AppState.posts.splice(postIndex, 1, updatedPost)
  }

}

export const postsService = new PostsService()