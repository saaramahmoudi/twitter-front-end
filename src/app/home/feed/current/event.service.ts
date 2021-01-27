import { SnapObservable } from './../../../services/snap.observable';
import { UserService } from './../../../services/user.service';
import { UserInfo } from './../../../services/profile.service';
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
        private userService: UserService
    ){}

    async getEvents(seconds: number){
        this.result.snap = [[]];
        this.result.subject.next(this.result.snap);
        const list = await this.firestore.collection("Events").where("madeAt", ">=", seconds).onSnapshot(
            (events) => {
                this.setUpFromDocs(events.docs);
            }
        );
    }

    async setUpFromDocs(docs: firebase.firestore.QueryDocumentSnapshot[]){
        this.result.snap = [[]];
        for (let item of docs){
            const event = item.data() as PostEvent;
            event.isOg = false;
            event.post = await this.postService.getPostSnapShot(event.postId);
            event.user = await this.userService.getUserSnapShot(event.madeByUserId);
            this.result.snap[0].push(event);
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
























