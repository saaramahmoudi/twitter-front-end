import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  search($event: {detail: {value: string}}){
    console.log($event.detail.value)
    this.searchService.searchTweet($event.detail.value);
  }

}
