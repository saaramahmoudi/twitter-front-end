import { HttpClient } from '@angular/common/http';
import { SnapObservable } from './snap.observable';
import { FirestoreRealTime } from './firestore.realtime';
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";

export interface UserInfo{
    imageSrc: string;
    name: string;
    email: string;
    tag: string;
}

@Injectable({providedIn: 'root'})
export class PersonalProfileService{

    
    private _userInfo:  FirestoreRealTime<UserInfo> = null;
    private _snap = new SnapObservable<FirestoreRealTime<UserInfo>>();
    public get userInfoObservable(): SnapObservable<FirestoreRealTime<UserInfo>> {return this._snap}
    constructor(
        private authService: AuthService,
        private httpClient: HttpClient 
    ){
        this.setUp(this.authService.isLogedinSnapShot);
        this.authService.isLogedin.subscribe(
            state => this.setUp(state)
        );
    }

    setUp(status: boolean){
        if(status){
            this._userInfo = new FirestoreRealTime<UserInfo>("UserProfile", () => {return this.authService.getEmail()});
            this._userInfo.start();
            this._snap.snap = this._userInfo;
            this._snap.subject.next(this._userInfo);
        }else{
            if (this._userInfo){
                this._userInfo.end();
            }
        }
    }


    
    async setData(userInfo: UserInfo, firestore: FirestoreRealTime<UserInfo>){
        try {
            await firestore.doc.set(userInfo);            
        } catch (e){
            const res = new Promise(
                async (resolve, reject) =>{
                    this.httpClient.post('http://localhost:8080/update', {tag: userInfo.tag}).subscribe(
                        async res => {
                            resolve(await firestore.doc.set(userInfo));
                        },
                        err => {
                            reject(err);
                        }
                    );
                }
            );
            return res;
        }
    }







}


























