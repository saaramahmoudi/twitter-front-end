import { LoadingController } from '@ionic/angular';
import { ToggleLikeInterface, ToggleRetweetInterface, CreatePostResource } from './../../environments/communications';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Tweet, TweetService } from './tweet.service';
import { UserInfo, PersonalProfileService } from './profile.service';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { Injectable } from '@angular/core';



export interface Post {
    id: string;
    likedByUserIds: string[]; 
    retweetedByUserIds: string[];
    tweetId: string;
    userId: string;
    user: UserInfo;
    tweet: Tweet;
    madeAt: number;
}


@Injectable({providedIn: 'root'})
export class PostService {

    firestore = firebase.firestore(firebase.app());
    posts: {[id: string]: Post[]} = {};
    constructor(
        private userService: UserService,
        private tweetService: TweetService,
        private httpClient: HttpClient,
        private personal: PersonalProfileService
    ){}

    likePost(post: Post): Promise<void>{
        const payload: ToggleLikeInterface = {id: post.id};
        if (!post.likedByUserIds){
            post.likedByUserIds = [];
        } 
        return new Promise<void>(
            (resolve, reject) => {
                console.log("sending like request");
                this.httpClient.post(environment.urls.toggleLikePost, payload).subscribe(
                    res => {
                        console.log("result for liking post :" );
                        console.log(res);
                        for(let p of this.posts[post.id]){
                            if (!p.likedByUserIds.includes(this.personal.self.id))
                                p.likedByUserIds.push(this.personal.self.id);
                            else 
                                p.likedByUserIds.splice(post.likedByUserIds.indexOf(this.personal.self.id), 1)
                        }
                        resolve();
                    },
                    err => {
                        console.log("error for liking post :" );
                        console.log(err);
                        resolve();
                    }
                );
            }
        )
    }

    retweetPost(post: Post): Promise<void>{
        const payload: ToggleRetweetInterface = {id: post.id};
        if (!post.retweetedByUserIds){
            post.retweetedByUserIds = [];
        } 
        return new Promise<void>(
            (resolve, reject) => {
                console.log("sending retweet request");
                this.httpClient.post(environment.urls.toggleRetweetPost, payload).subscribe(
                    res => {
                        console.log("result for retweeting post :" );
                        console.log(res);
                        for(let p of this.posts[post.id]){
                            if (!p.retweetedByUserIds.includes(this.personal.self.id))
                                p.retweetedByUserIds.push(this.personal.self.id);
                            else 
                                p.retweetedByUserIds.splice(p.retweetedByUserIds.indexOf(this.personal.self.id), 1)
                        }
                        resolve();
                    },
                    err => {
                        console.log("error for retweeting post :" );
                        console.log(err);
                        resolve();
                    }
                );
            }
        )
    }
    async completePost(post: Post): Promise<Post>{
        
        post.tweet = await this.tweetService.getTweetSnapShot(post.tweetId);
        post.user = await this.userService.getUserSnapShot(post.userId);
        if (!this.posts[post.id])  
         this.posts[post.id] = [post];
        else 
            this.posts[post.id].push(post);
        return post;
    }

    async getPostSnapShot(id: string): Promise<Post>{
        const post = (await this.firestore.collection("Posts").doc(id).get()).data() as Post;
        return await this.completePost(post);
    }

    async getPostsOfUserSnapShot(userId: string): Promise<Post[]>{

        const list = await this.firestore.collection("Posts").where("userId", "==", userId).get();
        const res: Post[] = [];
        for (let item of list.docs) {
            const post = item.data() as Post
            res.push(post);
            // We don't wait so that we can use concurrency
            this.completePost(post);
        }
        return res;
    }
    async getRecentPostSnapShot(second: number): Promise<Post[]>{
        const res: Post[] = [];
        // const t = this.firestore.collection("Posts").where("madeAt", ">=", second).
        const list = await this.firestore.collection("Posts").where("madeAt", ">=", second).get();
        for (let item of list.docs) {
            res.push(await this.completePost(item.data() as Post))
        }
        return res;
    }

    async getPostsByTweetId(id: string): Promise<Post> {
        const results = await this.firestore.collection("Posts").where("tweetId", "==", id).get();
        if (results.docs.length > 1) {
            throw Error("More than one tweet linked to the post");
        }
        if (results.docs.length == 0) {
            throw Error("Post linked to tweet could not be found");
        }
        const post = results.docs[0].data() as Post;
        return await this.completePost(post);
    }
    

    tweet(text: string){
        const payload: CreatePostResource = {text};
        console.log("creating post");
        this.httpClient.post(environment.urls.createPost, payload).subscribe(
            res => {
                console.log("Post creation result");
                console.log(res);
            },
            err => {
                console.log("Post creation err");
                console.log(err);
            }
        );
    }

}















