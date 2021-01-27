import { ToggleFollowResource } from './../../environments/communications';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserInfo, PersonalProfileService } from './profile.service';
import { Injectable } from "@angular/core";


import firebase from 'firebase/app';
import 'firebase/firestore';









@Injectable({providedIn: 'root'})
export class UserService{

    firestore = firebase.firestore(firebase.app());

    constructor(
        private personalProfile: PersonalProfileService,
        private httpClient: HttpClient
    ){}

    async getUserSnapShot(userId: string): Promise<UserInfo>{
        return (await this.firestore.collection("UserProfile").doc(userId).get()).data() as UserInfo;
    }



    getListOfUserPromises(userIds: string[]): Promise<UserInfo|void>[]{
        const res: Promise<UserInfo>[] = [];
        for(let userId of userIds){
            const dataPromise = this.firestore.collection("UserProfile").doc(userId).get().then(
                res => {
                    return res.data() as UserInfo;
                },
                err => {
                    console.log("error in getting the user ");
                    console.log(err);
                    return err;
                }
            )
            res.push(
                dataPromise
            );
        }
        return res;
    }

    followUser(userId: string){
        const payload: ToggleFollowResource = {userId};
        console.log("requesting toggle follow");
        this.httpClient.post(environment.urls.followUser, payload).subscribe(
            res => {
                console.log("here is toggle follow req result");
                console.log(res);
            },
            err => {
                console.log("here is toggle follow req error");
                console.log(err);
            }
        );
    }

} 





















