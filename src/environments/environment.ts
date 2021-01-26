import { Url } from './communications';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const url: Url = {
  createPost: "http://localhost:8080/create",
  toggleLikePost: "http://localhost:8080/like",
  toggleRetweetPost: "http://localhost:8080/retweet",
  getPost: "http://localhost:8080/get",

  getUser: "http://localhost:8081/get",
  updateTagUser: "http://localhost:8081/update",
  createUser: "http://localhost:8081/create",
  checkUser: "http://localhost:8081/check",
  followUser: "http://localhost:8081/follow",
}
export const environment = {
  production: false,
  urls: url 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
