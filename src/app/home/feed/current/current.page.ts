import { PersonalProfileService } from './../../../services/profile.service';
import { Observable } from 'rxjs';
import { Post, PostService } from './../../../services/post.service';
import { EventService, PostEvent} from './event.service';
import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.page.html',
  styleUrls: ['./current.page.scss'],
})
export class CurrentPage implements OnInit, OnChanges {
  events: PostEvent[] = [];
  posts: Post[] = []; 
  tweetText = "";
  constructor(
    private eventService: EventService,
    private postService: PostService,
    private personal: PersonalProfileService,
    private cdf: ChangeDetectorRef
  ) { }

  // TODO change it so that we paginate the number of days
  ngOnInit() {

    this.personal.userInfoObservable.subject.subscribe(
      e => this.cdf.detectChanges()
    )
    
    this.personal.userInfoObservable.snap.instance.subject.subscribe(
      e => this.cdf.detectChanges()
    )

    this.setUp(this.eventService.result.snap);
    this.eventService.result.subject.subscribe(
      events => this.setUp(events) 
    );
  }

  ngOnChanges(){
  }

  async setUp(events: PostEvent[][]){
    this.events = [].concat.apply([], events);
    // console.log(events);
    this.events.sort((e1, e2) =>  e2.madeAt - e1.madeAt);
  }

  tweet(){
    this.postService.tweet(this.tweetText);
  }

}
