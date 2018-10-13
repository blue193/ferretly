import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiSwitchModule } from 'ngx-toggle-switch';
import { TagInputModule } from 'ngx-chips';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { ChangeEmailModalComponent } from './components/change-email-modal/change-email-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    UiSwitchModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    SettingsComponent,
    ChangeEmailModalComponent
  ],
  entryComponents: [
    ChangeEmailModalComponent
  ]
})
export class SettingsModule { }
