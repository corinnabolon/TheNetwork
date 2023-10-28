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
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
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

  async writePost(content) {
    const res = await api.post("api/posts/", content)
    logger.log("Res.data.posts", res.data)
    let newPost = new Post(res.data)
    logger.log("New Post I'm going to add to the AppState", newPost)
    AppState.posts.unshift(newPost)
    logger.log("New Post added to the AppState, here's the whole array", AppState.posts)
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    logger.log("Deleted post, res.data:", res.data)
    AppState.posts = AppState.posts.filter((post) => post.id != postId)
    logger.log("Here is AppState.posts after filtering out the one with the same postId", AppState.posts)
  }

}

export const postsService = new PostsService()