import { Routes, CanActivate } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './shared/service/auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './shared/service/role-guard.service';

import { LeaveComponent } from './leave/leave.component';
// import { WelcomeComponent } from './welcome/welcome.component';

import { from } from 'rxjs/observable/from';
export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  }, {
    path: 'subjects',
    loadChildren: './subjects/subjects.module#SubjectsModule'
  }, {
    path: 'posts',
    loadChildren: './posts/posts.module#PostsModule'
  },{
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'leave',
    component: LeaveComponent
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
},
{
  path: '**',
  redirectTo: 'error/404'
}

];

