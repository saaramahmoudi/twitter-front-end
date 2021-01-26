import { UserInfo } from './../../services/profile.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss'],
})
export class UserPictureComponent implements OnInit {

  @Input() user: UserInfo;
  canBeShown = true;

  constructor() { }

  ngOnInit() {
    console.log(this.user)
  }

}
