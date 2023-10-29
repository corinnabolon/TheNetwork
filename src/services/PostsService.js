import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
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
    let oldPost = AppState.posts[postIndex]
    updatedPost.updatedAt = oldPost.updatedAt
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
    let newPost = new Post(res.data)
    AppState.posts.unshift(newPost)
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    AppState.posts = AppState.posts.filter((post) => post.id != postId)
  }

  async searchPosts(query) {
    const res = await api.get(`api/posts?query=${query}`)
    let searchedPosts = res.data.posts.map((postPOJO) => new Post(postPOJO))
    AppState.posts = searchedPosts
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

  setActivePost(postId) {
    let activePost = AppState.posts.find((post) => postId == post.id)
    AppState.activePost = activePost
  }

  async editPost(activePost) {
    activePost.updatedAt = new Date()
    const res = await api.put(`api/posts/${activePost.id}`, activePost)
    let newPost = new Post(res.data)
    let postIndex = AppState.posts.findIndex((post) => post.id == newPost.id)
    AppState.posts.splice(postIndex, 1, newPost)
  }

}

export const postsService = new PostsService()