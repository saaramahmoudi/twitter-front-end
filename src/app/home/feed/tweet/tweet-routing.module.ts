import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TweetPage } from './tweet.page';

const routes: Routes = [
  
  {
    path: ':id',
    component: TweetPage
  },
  {
    path: '**',
    redirectTo: "/home/tabs/user/authenticate"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TweetPageRoutingModule {}
