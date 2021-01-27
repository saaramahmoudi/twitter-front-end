import { EventService } from './../current/event.service';
import { PostEvent } from 'src/app/home/feed/current/event.service';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.page.html',
  styleUrls: ['./tweet.page.scss'],
})
export class TweetPage implements OnInit {
  event: PostEvent;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.setUp(this.route.snapshot.params);
    this.route.params.subscribe(
      params => this.setUp(params)
    );
  }

  async setUp(params: Params){
    const post = await this.postService.getPostSnapShot(params["id"]);
    this.event = this.eventService.turnPostToEvent(post);
  }

}
