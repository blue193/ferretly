import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PostsRoutingModule } from './posts-routing.module';
import { PostGridComponent } from './components/post-grid/post-grid.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostLayoutComponent } from './components/post-layout/post-layout.component';

import { PostsService } from './services/posts.service';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    PostGridComponent,
    PostListComponent,
    PostLayoutComponent
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
