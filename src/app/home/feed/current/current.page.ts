import { Observable } from 'rxjs';
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
  tweetText = "";
  constructor(
    private eventService: EventService,
    private postService: PostService
  ) { }

  // TODO change it so that we paginate the number of days
  ngOnInit() {
    
    const date = new Date();
    date.setDate(date.getDate() - 6);
    const seconds = Math.floor(date.getTime()/1000);
    this.eventService.getEvents(seconds);
    this.setUp(this.eventService.result.snap);
    this.eventService.result.subject.subscribe(
      events => this.setUp(events) 
    );
  }

  async setUp(events: PostEvent[][]){
    this.events = [].concat.apply([], events);
    console.log(events);
    this.events.sort((e1, e2) =>  e2.madeAt - e1.madeAt);
  }

  tweet(){
    this.postService.tweet(this.tweetText);
  }

}
