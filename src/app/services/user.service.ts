import { UserInfo } from './profile.service';
import { Injectable } from "@angular/core";


import firebase from 'firebase/app';
import 'firebase/firestore';









@Injectable({providedIn: 'root'})
export class UserService{

    firestore = firebase.firestore(firebase.app());

    constructor(){}

    async getUserSnapShot(userId: string): Promise<UserInfo>{
        return (await this.firestore.collection("UserProfile").doc(userId).get()).data() as UserInfo;
    }



} 





















