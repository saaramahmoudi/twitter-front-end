import { SnapObservable } from './snap.observable';
import { FirestoreRealTime } from './firestore.realtime';
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";

export interface UserInfo{
    imageSrc: string;
    name: string;
}

@Injectable({providedIn: 'root'})
export class ProfileService{

    
    private _userInfo:  FirestoreRealTime<UserInfo> = null;
    private _snap = new SnapObservable<FirestoreRealTime<UserInfo>>();
    public get userInfoObservable(): SnapObservable<FirestoreRealTime<UserInfo>> {return this._snap}
    constructor(
        private authService: AuthService
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


    







}


























