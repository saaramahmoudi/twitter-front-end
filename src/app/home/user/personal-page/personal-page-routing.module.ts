import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalPagePage } from './personal-page.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalPagePageRoutingModule {}
