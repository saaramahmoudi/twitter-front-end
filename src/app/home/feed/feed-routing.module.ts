import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'current',
    loadChildren: () => import('./current/current.module').then( m => m.CurrentPageModule)
  },
  {
    path: 'tweet',
    loadChildren: () => import('./tweet/tweet.module').then( m => m.TweetPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: '**',
    redirectTo: 'current'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPageRoutingModule {}
