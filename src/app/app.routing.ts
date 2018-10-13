import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
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
  path: '**',
  redirectTo: 'error/404'
}];

