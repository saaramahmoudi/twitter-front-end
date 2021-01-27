import { UserInfo } from './../../services/profile.service';
import { Post } from './../../services/post.service';
import { SearchService } from './../../services/search.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchTweets: boolean = true;
  tweets: Post[] = [];
  userIds: string[] = [];
  searchValue: string = '';

  constructor(
    private searchService: SearchService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  async search(){
    if (this.searchValue == '') {
      this.tweets = [];
      this.userIds = [];
      this.ref.detectChanges();
      return;
    }
    if (this.searchTweets) {
      this.tweets = await this.searchService.searchTweet(this.searchValue);
    }else {
      this.userIds = await this.searchService.searchUser(this.searchValue);
      this.ref.detectChanges();
    }
  }
  setSearchValue($event: {detail: {value: string}}){
    this.searchValue = $event.detail.value;
    this.search();
  }

}
