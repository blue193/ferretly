import { Component, OnInit, OnDestroy } from '@angular/core';
import { audit } from 'rxjs/operators';
import { AuthService } from '../../shared/service/auth.service';
import 'rxjs/add/operator/pairwise';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';

const settingPages = ['/signup/plan', '/signup/info', '/signup/complete'];

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  subScription: Subscription;
  isSettingPage: boolean = false;
  isLoginPage: boolean = false;
  isCompletePage   : boolean = false;

  constructor(
    private router: Router,
    private _location: Location
  ) {
    this.subScription = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.initFlags();
      if (event.url === '/signup/welcome') {
        this.isCompletePage = true;
      } else if (event.url === '/login') {
        this.isLoginPage = true;
      } else {
        this.isSettingPage = settingPages.includes(event.url);
      }      
    });
  }

  ngOnInit(): void {

  }

  back() {
      this._location.back();
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }

  initFlags() {
    this.isCompletePage = false;
    this.isLoginPage = false;
    this.isSettingPage = false;
  }

}
