import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectListComponent } from './components/subject-list/subject-list.component';

const routes: Routes = [{
  path: '',
  component: SubjectListComponent,
  data: {
    heading: 'Subjects List'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
