import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteComponent } from './complete/complete.component';
import { InformationComponent } from './information/information.component';
import { PlanComponent } from './plan/plan.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'complete', component: CompleteComponent},
  {path: 'info', component: InformationComponent},
  {path: 'plan', component: PlanComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: '**', redirectTo: 'plan'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
