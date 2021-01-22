import { FirestoreRealTime } from './../../../services/firestore.realtime';
import { ProfileService, UserInfo } from './../../../services/profile.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.page.html',
  styleUrls: ['./personal-page.page.scss'],
})
export class PersonalPagePage implements OnInit {

  constructor(
    public authService: AuthService,
    public profileService: ProfileService,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController
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
    const panel = await this.loadingController.create({message: 'Please wait for update'});
    panel.present();
    try{
      await this.profileService.setData(this.userInfo, this.userInfoFirestore);
    }catch (e){
      const ionAlert = await this.alertController.create({message: e.error.message, buttons: ["Ok"]});
      ionAlert.present();
    }finally {
      panel.dismiss();
    }
  }

}
