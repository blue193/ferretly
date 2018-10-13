import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountRoutes } from './account.routing';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ProfileComponent } from './profile/profile.component';
import { CreditCardModalComponent } from './credit-card-modal/credit-card-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotComponent,
    LockscreenComponent,
    ProfileComponent,
    CreditCardModalComponent
  ],
  entryComponents: [CreditCardModalComponent]
})

export class AccountModule {}
