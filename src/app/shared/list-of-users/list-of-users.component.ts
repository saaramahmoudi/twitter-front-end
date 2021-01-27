import { UserService } from './../../services/user.service';
import { UserInfo } from './../../services/profile.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss'],
})
export class ListOfUsersComponent implements OnInit, OnChanges {
  
  @Input() userIds: string[] = [];
  users: UserInfo[] = []; 

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
  }
  ngOnChanges(){
    this.setUp();
  }
  setUp(){
    this.users = [];
    for(let promise of this.userService.getListOfUserPromises(this.userIds)){
      promise.then(
        user => {
          if (user)
            this.users.push(user);
          else 
            console.log("got empty user for: ", this.userIds);

        },
        err => {
          console.log("error in listing users : ");
          console.log(err);
        }
      );
    }
  }
}
