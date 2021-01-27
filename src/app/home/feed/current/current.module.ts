import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentPageRoutingModule } from './current-routing.module';

import { CurrentPage } from './current.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentPageRoutingModule,
    SharedModule
  ],
  declarations: [CurrentPage]
})
export class CurrentPageModule {}


