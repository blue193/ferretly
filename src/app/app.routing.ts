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
import { PlanComponent } from './payment/plan/plan.component';
import { InformationComponent } from './payment/information/information.component';
import { CompleteComponent } from './payment/complete/complete.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
{
  path: 'leave',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    component: LeaveComponent
  }]
},
{
  path: 'plan',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    component: PlanComponent
  }]
},
{
  path: 'info',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    component: InformationComponent
  }]
},
{
  path: 'complete',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    component: CompleteComponent
  }]
},
{
  path: 'welcome',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    component: WelcomeComponent
  }]
},
{
  path: '**',
  redirectTo: 'error/404'
}

];

