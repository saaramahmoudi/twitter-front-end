import { AuthGaurd } from './../../services/auth.gaurd';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: 'authenticate',
    loadChildren: () => import('./authenticate/authenticate.module').then( m => m.AuthenticatePageModule),
    canActivate: [AuthGaurd]
  },
  {
    path: 'personal-page',
    loadChildren: () => import('./personal-page/personal-page.module').then( m => m.PersonalPagePageModule)
  },
  {
    path: '**',
    redirectTo : 'authenticate'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
