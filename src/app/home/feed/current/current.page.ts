import { Post, PostService } from './../../../services/post.service';
import { EventService, PostEvent} from './event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})
export class CurrentPage implements OnInit {
  events: PostEvent[] = [];
  posts: Post[] = []; 
  constructor(
    private eventService: EventService,
    private postService: PostService
  ) { }

  // TODO change it so that we paginate the number of days
  ngOnInit() {
    
    this.setUp();

  }

  async setUp(){
    const date = new Date();
    date.setDate(date.getDate() - 6);
    const seconds = Math.floor(date.getTime()/1000);
    
    this.events = await this.eventService.getEvents(seconds);
    this.posts = await this.postService.getRecentPostSnapShot(seconds);

    for(let post of this.posts){
      this.events.push({
        eventType:  'PostCreated',
        madeAt: post.madeAt,
        madeByUserId: post.userId,
        postId: post.id,
        post: post,
        user: post.user
      })
    }
    this.events.sort((e1, e2) => e1.madeAt - e2.madeAt);
  }

}
