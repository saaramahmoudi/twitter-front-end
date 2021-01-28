import { Url } from './communications';


const url: Url = {
  createPost: "https://us-central1-twitter-1db2a.cloudfunctions.net/CreatePostFunction",
  toggleLikePost: "https://us-central1-twitter-1db2a.cloudfunctions.net/ToggleLikePostFunction",
  toggleRetweetPost: "https://us-central1-twitter-1db2a.cloudfunctions.net/ToggleRetweetPostFunction",
  getPost: "https://us-central1-twitter-1db2a.cloudfunctions.net/GetPostByIdFunction",

  getUser: "https://us-central1-twitter-1db2a.cloudfunctions.net/GetUserFunction",
  updateTagUser: "https://us-central1-twitter-1db2a.cloudfunctions.net/UpdateUserTagFunction",
  createUser: "https://us-central1-twitter-1db2a.cloudfunctions.net/CreateUser",
  checkUser: "https://us-central1-twitter-1db2a.cloudfunctions.net/CheckDoc",
  followUser: "https://us-central1-twitter-1db2a.cloudfunctions.net/ToggleFollow",
}
export const environment = {
  production: true,
  urls: url 
};
