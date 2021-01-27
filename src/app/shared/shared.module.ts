import { RouterModule } from '@angular/router';
import { ListOfUsersComponent } from './list-of-users/list-of-users.component';
import { IndividualTweetComponent } from './individual-tweet/individual-tweet.component';
import { IonicModule } from '@ionic/angular';
import { UserPictureComponent } from './user-picture/user-picture.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [UserPictureComponent, IndividualTweetComponent, ListOfUsersComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [UserPictureComponent, IndividualTweetComponent, ListOfUsersComponent]
})
export class SharedModule { }
