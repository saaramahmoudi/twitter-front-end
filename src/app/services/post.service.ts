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
}


@Injectable({providedIn: 'root'})
export class PostService {

    firestore = firebase.firestore(firebase.app());

    constructor(
        private userService: UserService,
        private tweetService: TweetService,
    ){}

    async getPostSnapShot(id: string): Promise<Post>{
        return (await this.firestore.collection("Posts").doc(id).get()).data() as Post;
    }

    async getPostsByTweetId(id: string): Promise<Post> {
        const results = await this.firestore.collection("Posts").where("tweetId", "==", id).get();
        console.log(results.docs.length);
        if (results.docs.length > 1) {
            throw Error("More than one tweet linked to the post");
        }
        console.log(results);
        const post = results.docs[0].data() as Post;

        post.tweet = await this.tweetService.getTweetSnapShot(post.tweetId);
        post.user = await this.userService.getUserSnapShot(post.userId);
        return post;
    }
    

}















