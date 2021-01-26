import { IonicModule } from '@ionic/angular';
import { UserPictureComponent } from './user-picture/user-picture.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [UserPictureComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [UserPictureComponent]
})
export class SharedModule { }
