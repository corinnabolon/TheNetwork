export class Profile {
  constructor(data) {
    this.id = data._id || data.id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}

const profileData = `"_id": "653826b8545fd921aa98f7e0",
"subs": [
"auth0|653826b74ed9a649d10335e3"
],
"email": "orangepickle@orangepickle.com",
"name": "orangepickle",
"picture": "https://s.gravatar.com/avatar/dbc68543faa9deae637f2c855d4ef04f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2For.png",
"bio": "",
"coverImg": "https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
"github": "",
"linkedin": "",
"resume": "",
"class": "",
"graduated": false,
"createdAt": "2023-10-24T20:19:08.548Z",
"updatedAt": "2023-10-24T20:19:08.548Z",
"__v": 0,
"id": "653826b8545fd921aa98f7e0"`