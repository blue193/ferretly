import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';

import { CompleteComponent } from './complete/complete.component';
import { InformationComponent } from './information/information.component';
import { PlanComponent } from './plan/plan.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    NgbModule
  ],
  declarations: [
    CompleteComponent,
    InformationComponent,
    PlanComponent,
    WelcomeComponent
  ]
})
export class SignupModule { }
