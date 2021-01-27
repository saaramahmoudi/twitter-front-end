import { EventService } from './../../home/feed/current/event.service';
import { LoadingController } from '@ionic/angular';
import { Post, PostService } from './../../services/post.service';
import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PostEvent } from 'src/app/home/feed/current/event.service';

@Component({
  selector: 'app-individual-tweet',
  templateUrl: './individual-tweet.component.html',
  styleUrls: ['./individual-tweet.component.scss'],
})

export class IndividualTweetComponent implements OnInit {

  @Input() event: PostEvent;

  @Input() post: Post;
  showLikes = false;
  showRetweets = false;
  constructor(
    private router: Router,
    private postService: PostService,
    private eventService: EventService,
    private loadingController: LoadingController,
    private host: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    if (! this.event){
      this.event = this.eventService.turnPostToEvent(this.post);
    }
  }

  showUser(){
    this.router.navigate(["/", "home", "tabs", "feed", "user", this.event.user.id])
  }

  async callFunctionAndWait(func: () => Promise<void>){
    const load = await this.loadingController.create({message: "Please wait"})
    load.present();
    try {
      await func();
    }catch (e) {
      console.log(e)
    }finally{
      load.dismiss();
    }
    load.dismiss();
  }
  async retweet(){
    
    await this.callFunctionAndWait(
      () => this.postService.retweetPost(this.event.post) 
    );
    // if (this.event.isReve)

  }

  async like(){
    this.callFunctionAndWait(
      () => this.postService.likePost(this.event.post)
    );
  }
  showTweet(){
    this.router.navigate(["/", "home", "tabs", "feed", "tweet", this.event.postId])
  }

}
