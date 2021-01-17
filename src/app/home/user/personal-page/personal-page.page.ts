import { FirestoreRealTime } from './../../../services/firestore.realtime';
import { ProfileService, UserInfo } from './../../../services/profile.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.page.html',
  styleUrls: ['./personal-page.page.scss'],
})
export class PersonalPagePage implements OnInit {

  constructor(
    public authService: AuthService,
    public profileService: ProfileService,
    private router: Router
  ) { }

  userInfo: UserInfo;
  userInfoFirestore: FirestoreRealTime<UserInfo>;

  ngOnInit() {
    
    if(this.profileService.userInfoObservable.snap){

      this.setUpUserInfo(this.profileService.userInfoObservable.snap);
    }
    this.profileService.userInfoObservable.subject.subscribe(
      info => this.setUpUserInfo(info)
    );

  }

  setUpUserInfo(data: FirestoreRealTime<UserInfo>){
    this.userInfoFirestore = data;
    this.userInfo = data.snapShot;
    data.observable.subscribe(
      res => this.userInfo = res
    );
  }

  
  async logout(){
    await this.authService.logout();
    this.router.navigate(["/", "home", "tabs", "user", "authenticate"]);
  }

  async saveData(){
    console.log(this.userInfo);
    await this.userInfoFirestore.setData(this.userInfo);
  }

}
