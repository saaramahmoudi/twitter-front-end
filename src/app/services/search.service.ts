import { PostService } from './post.service';
import { Injectable } from '@angular/core';



import firebase from 'firebase/app';
import 'firebase/firestore';

import algoliasearch from 'algoliasearch/lite';


export interface Post {
    likedByUserIds: []
    retweetedByUserIds: []

}

@Injectable({providedIn: 'root'})
export class SearchService {

    firestore = firebase.firestore(firebase.app());
    client = algoliasearch("VJ1Y32BXVD", "0f62ff904c7fb3f077cfe86df170d52c");
    tweets = this.client.initIndex("tweet");
    users = this.client.initIndex("user");
    constructor(
        private postService: PostService
    ){}

    async getSearchResultsFromFirestore<T>(collectionAddress : string, objectID: string): Promise<T> {
        return ;
    }

    async searchUser(query: string){
        const res = await this.users.search(query);
        
        console.log(res);
    }


    async searchTweet(query: string){
        const res = await this.tweets.search(query);
        const listRes = [];
        for(let hit of res.hits){
            listRes.push(await this.postService.getPostsByTweetId(hit.objectID));
        }
        console.log(res);
        console.log(listRes);
    }


}
























