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
}


@Injectable({providedIn: 'root'})
export class EventService{

    firestore = firebase.firestore(firebase.app());

    constructor(
        private postService: PostService,
        private userService: UserService
    ){}

    async getEvents(seconds: number): Promise<PostEvent[]>{
        const res: PostEvent[] = [];
        const list = await this.firestore.collection("Events").where("madeAt", ">=", seconds).get();
        for (let item of list.docs){
            const event = item.data() as PostEvent;
            event.post = await this.postService.getPostSnapShot(event.postId);
            event.user = await this.userService.getUserSnapShot(event.madeByUserId);
            res.push(event);
        }
        return res;
    }
    
}
























