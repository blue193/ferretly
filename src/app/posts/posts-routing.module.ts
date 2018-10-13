import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostGridComponent } from './components/post-grid/post-grid.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostLayoutComponent } from './components/post-layout/post-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PostLayoutComponent,
    children: [{
      path: 'grid',
      component: PostGridComponent
    },
    {
      path: 'list',
      component: PostListComponent
    },
    {
      path: '**',
      redirectTo: 'grid'
    }]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
