export class Post {
  constructor(data) {
    this.id = data._id || data.id
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likeIds = data.likeIds
    this.createdAt = new Date(data.createdAt).toLocaleString()
    this.updatedAt = new Date(data.updatedAt).toLocaleString()
    this.creator = data.creator
    this.likes = data.likes
  }
}

let postData = `{
  "_id": "65295863cc6e96bc11057d28",
  "body": "Trash Panda Forever",
  "imgUrl": "https://images.unsplash.com/photo-1641080382874-0dfc4c66dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "creatorId": "652958305bfd1dca2f0579a0",
  "likeIds": [
      "64ef5d411194166d253dd7e4",
      "649b15df024908ebc1ffe602"
  ],
  "createdAt": "2023-10-13T14:46:59.517Z",
  "updatedAt": "2023-10-27T16:13:20.979Z",
  "__v": 17,
  "creator": {
      "_id": "652958305bfd1dca2f0579a0",
      "subs": [
          "auth0|6529582f05506d01ecc209be"
      ],
      "email": "trashpanda99@gmail.com",
      "name": "Trash Panda",
      "picture": "https://images.unsplash.com/photo-1615812214207-34e3be6812df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "bio": "Eatin Trash",
      "coverImg": "https://images.unsplash.com/photo-1553058296-61093581de13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "github": "",
      "linkedin": "",
      "resume": "",
      "class": "",
      "graduated": true,
      "createdAt": "2023-10-13T14:46:14.407Z",
      "updatedAt": "2023-10-13T14:47:51.275Z",
      "__v": 0,
      "id": "652958305bfd1dca2f0579a0"
  },
  "likes": [
      {
          "_id": "64ef5d411194166d253dd7e4",
          "name": "dasevo",
          "picture": "https://wallpapers.com/images/hd/cool-profile-picture-o6xweez7rh4347gx.jpg",
          "id": "64ef5d411194166d253dd7e4"
      },
      {
          "_id": "649b15df024908ebc1ffe602",
          "name": "LIL JEREMY 🐀",
          "picture": "https://64.media.tumblr.com/tumblr_m0ai0nrErM1r03kk7o1_500.jpg",
          "id": "649b15df024908ebc1ffe602"
      }
  ],
  "id": "65295863cc6e96bc11057d28"
}`