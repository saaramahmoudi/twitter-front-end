import { LoginGaurd } from './../services/login.gaurd';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule),
        canActivate: [LoginGaurd]
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule),
        canActivate: [LoginGaurd]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'tabs/user'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
