import { IndividualTweetComponent } from './individual-tweet/individual-tweet.component';
import { IonicModule } from '@ionic/angular';
import { UserPictureComponent } from './user-picture/user-picture.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [UserPictureComponent, IndividualTweetComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [UserPictureComponent, IndividualTweetComponent]
})
export class SharedModule { }
