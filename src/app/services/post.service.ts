import { LoadingController } from '@ionic/angular';
import { ToggleLikeInterface, ToggleRetweetInterface } from './../../environments/communications';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Tweet, TweetService } from './tweet.service';
import { UserInfo } from './profile.service';

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

    constructor(
        private userService: UserService,
        private tweetService: TweetService,
        private httpClient: HttpClient,
    ){}

    likePost(post: Post): Promise<void>{
        const payload: ToggleLikeInterface = {id: post.id};
        return new Promise<void>(
            (resolve, reject) => {
                console.log("sending like request");
                this.httpClient.post(environment.urls.toggleLikePost, payload).subscribe(
                    res => {
                        console.log("result for liking post :" );
                        console.log(res);
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
        return new Promise<void>(
            (resolve, reject) => {
                console.log("sending retweet request");
                this.httpClient.post(environment.urls.toggleRetweetPost, payload).subscribe(
                    res => {
                        console.log("result for retweeting post :" );
                        console.log(res);
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
        return post;
    }

    async getPostSnapShot(id: string): Promise<Post>{
        const post = (await this.firestore.collection("Posts").doc(id).get()).data() as Post;
        return await this.completePost(post);
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
    

}















