import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
  MessageModalComponent
} from './core';
import { environment } from '../environments/environment';
import { SharedService } from './shared/service/shared.service';
import { RoleGuardService } from './shared/service/role-guard.service';
import { AuthService } from './shared/service/auth.service';
import { AuthGuardService } from './shared/service/auth-guard.service';
import { FBConfirmModalComponent } from './core/fb-confirm-modal/fb-confirm-modal.component';
import { LoginComponent } from './login/login.component';
import { LeaveComponent } from './leave/leave.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    MessageModalComponent,
    FBConfirmModalComponent,
    LoginComponent,
    LeaveComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    NgbModule.forRoot(),
    MatSidenavModule,
    LocalStorageModule.withConfig({prefix: environment.localStorage.prefix, storageType: 'localStorage'}),
  ],
  entryComponents: [
    MessageModalComponent,
    FBConfirmModalComponent
  ],
  providers: [SharedService, RoleGuardService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
