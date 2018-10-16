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
  }, {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: 'login',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    component: LoginComponent
  }]
},
// { 
//   path: 'admin', 
//   component: 'AdminComponent', 
//   canActivate: [RoleGuard], 
//   data: { 
//     expectedRole: 'admin'
//   } 
// },
{
  path: 'leave',
  component: LeaveComponent
},
{
  path: '**',
  redirectTo: 'error/404'
}

];

