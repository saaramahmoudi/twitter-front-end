import { SnapObservable } from './../../../services/snap.observable';
import { UserService } from './../../../services/user.service';
import { UserInfo, PersonalProfileService } from './../../../services/profile.service';
import { Post, PostService } from './../../../services/post.service';
import { Injectable } from "@angular/core";





import firebase from 'firebase/app';
import 'firebase/firestore';






export interface PostEvent{
    eventType:  'PostLiked' | 'PostRetweeted' | 'PostCreated';
    madeAt: number;
    madeByUserId: string;
    postId: string;
    post: Post;
    user: UserInfo;
    isReversal: boolean;
    isOg: boolean;
}


@Injectable({providedIn: 'root'})
export class EventService{

    firestore = firebase.firestore(firebase.app());
    result: SnapObservable<PostEvent[][]> = new SnapObservable<PostEvent[][]>();
    constructor(
        private postService: PostService,
        private userService: UserService,
        private personalService: PersonalProfileService
    ){
        
        const date = new Date();
        date.setDate(date.getDate() - 6);
        const seconds = Math.floor(date.getTime()/1000);
        this.getEvents(seconds);
        this.personalService.userInfoObservable.snap.instance.subject.subscribe(
            user => {

                this.getEvents(seconds);
            }
        );
        this.personalService.userInfoObservable.subject.subscribe(
            userFire => {
                
                this.personalService.userInfoObservable.snap.instance.subject.subscribe(
                    user => {
                        
                        this.getEvents(seconds);
                    }
                );
                this.getEvents(seconds);
            }
        )
    }

    async getEvents(seconds: number){
        if(!this.personalService.self){

            return;
        }

        this.result.snap = [];
        this.result.subject.next(this.result.snap);
        const ids = this.personalService.self.followingsId || [];
        ids.push(this.personalService.self.id);
        let index = 0;
        for(let id of ids){
            const arr = [];
            this.result.snap.push(arr);
            this.result.subject.next(this.result.snap);
            await this.firestore.collection("Events").where("madeAt", ">=", seconds).
            where("madeByUserId", "==", id).
            onSnapshot(
                (events) => {
                    this.setUpFromDocs(events.docs, arr);
                }
            );
            index += 1;
        }
    }

    async setUpEvent(event: PostEvent){
        event.post = await this.postService.getPostSnapShot(event.postId);
        event.user = await this.userService.getUserSnapShot(event.madeByUserId);
    }
    async setUpFromDocs(docs: firebase.firestore.QueryDocumentSnapshot[], list: PostEvent[]){
        list.length = 0;
        for (let item of docs){
            const event = item.data() as PostEvent;
            event.isOg = false;
            this.setUpEvent(event);
            list.push(event);
        }
        this.result.subject.next(this.result.snap);
    }

    turnPostToEvent(post: Post): PostEvent{
        return {
            eventType:  'PostCreated',
            madeAt: post.madeAt,
            madeByUserId: post.userId,
            postId: post.id,
            post: post,
            user: post.user,
            isReversal: false,
            isOg: true
          };
    }
    
}
























