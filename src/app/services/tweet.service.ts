import { Injectable } from "@angular/core";


import firebase from 'firebase/app';
import 'firebase/firestore';




export interface MediaType{
    mediaSrc: string;
    isStill: boolean;
}

export interface Tweet{
    hashtags: string[];
    id: string[];
    media: MediaType; 
    text: string;
}







@Injectable({providedIn: 'root'})
export class TweetService{

    firestore = firebase.firestore(firebase.app());

    constructor(){}

    async getTweetSnapShot(id: string): Promise<Tweet>{
        return (await this.firestore.collection("Tweet").doc(id).get()).data() as Tweet;
    }

} 

















