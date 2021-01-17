import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPagePageRoutingModule } from './personal-page-routing.module';

import { PersonalPagePage } from './personal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalPagePageRoutingModule
  ],
  declarations: [PersonalPagePage]
})
export class PersonalPagePageModule {}
