import { UserInfo } from './profile.service';
import { UserService } from './user.service';
import { Post, PostService } from './post.service';
import { Injectable } from '@angular/core';



import firebase from 'firebase/app';
import 'firebase/firestore';

import algoliasearch from 'algoliasearch/lite';


@Injectable({providedIn: 'root'})
export class SearchService {

    firestore = firebase.firestore(firebase.app());
    client = algoliasearch("VJ1Y32BXVD", "0f62ff904c7fb3f077cfe86df170d52c");
    tweets = this.client.initIndex("tweet");
    users = this.client.initIndex("user");
    constructor(
        private userService: UserService,
        private postService: PostService
    ){}

    async getSearchResultsFromFirestore<T>(collectionAddress : string, objectID: string): Promise<T> {
        return ;
    }

    async searchUser(query: string): Promise<UserInfo[]>{
        const res = await this.users.search(query);
        const listRes: UserInfo[] = [];
        for(let hit of res.hits){
            listRes.push(await this.userService.getUserSnapShot(hit.objectID));
        }
        return listRes;
    }


    async searchTweet(query: string): Promise<Post[]>{
        const res = await this.tweets.search(query);
        const listRes: Post[] = [];
        for(let hit of res.hits){
            listRes.push(await this.postService.getPostsByTweetId(hit.objectID));
        }
        return listRes;
    }


}
























