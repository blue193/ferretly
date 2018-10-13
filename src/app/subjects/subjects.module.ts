import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectListComponent } from './components/subject-list/subject-list.component';

import { SubjectsService } from './services/subjects.service';
import { RunCheckModalComponent } from './components/run-check-modal/run-check-modal.component';
import { SubjectAddComponent } from './components/subject-add/subject-add.component';
import { ProfileSearchComponent } from './components/profile-search/profile-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubjectsRoutingModule,
    NgbModule
  ],
  declarations: [
    SubjectListComponent,
    RunCheckModalComponent,
    SubjectAddComponent,
    ProfileSearchComponent
  ],
  providers: [
    SubjectsService
  ],
  entryComponents: [
    RunCheckModalComponent,
    SubjectAddComponent,
    ProfileSearchComponent
  ]
})
export class SubjectsModule { }
