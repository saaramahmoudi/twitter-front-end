import { UserInfo } from './../../services/profile.service';
import { Post } from './../../services/post.service';
import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';


interface UserListItem {
  user: UserInfo; 
  imageCanBeShown: boolean;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchTweets: boolean = true;
  tweets: Post[] = [];
  users: UserListItem[] = [];
  searchValue: string;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  async search(){
    if (this.searchTweets) {
      this.tweets = await this.searchService.searchTweet(this.searchValue);
    }else {
      this.users = [];
      for (let user of await this.searchService.searchUser(this.searchValue)){
        this.users.push({user, imageCanBeShown: true})
      }
    }
  }
  setSearchValue($event: {detail: {value: string}}){
    this.searchValue = $event.detail.value;
    this.search();
  }
  imageError(userListItem: UserListItem){
    userListItem.imageCanBeShown = false;
  }

}
