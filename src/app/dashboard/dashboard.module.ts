import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './components/dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { environment } from '../../environments/environment';

import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DashboardRoutes),
    NgxChartsModule,
    AgmCoreModule.forRoot({apiKey: environment.googleAPIKey}),
    NgSelectModule,
    NgbModule
  ],
  declarations: [DashboardComponent],
  providers: [
    DashboardService
  ]
})

export class DashboardModule {}
