import { FirestoreRealTime } from './../../../services/firestore.realtime';
import { Post, PostService } from './../../../services/post.service';
import { UserInfo, PersonalProfileService } from './../../../services/profile.service';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: UserInfo;
  image: string;
  posts: Post[] = [];
  showFollowers = false;
  showFollowings = false;
  self: UserInfo;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    public profileService: PersonalProfileService
  ) { }

  ngOnInit() {
    this.setUp(this.route.snapshot.params);
    this.route.params.subscribe(
      params => this.setUp(params)
    );

  }

  

  async setUp(params: Params){
    this.user = await this.userService.getUserSnapShot(params["id"]);
    this.image = this.user.imageSrc;
    this.postService.getPostsOfUserSnapShot(this.user.id).then(
      posts => this.posts = posts
    );
  }

  follow(){
    this.userService.followUser(this.user.id);
  }

}
