import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TweetPageRoutingModule } from './tweet-routing.module';

import { TweetPage } from './tweet.page';
import { Share } from '@capacitor/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TweetPageRoutingModule,
    SharedModule
  ],
  declarations: [TweetPage]
})
export class TweetPageModule {}
