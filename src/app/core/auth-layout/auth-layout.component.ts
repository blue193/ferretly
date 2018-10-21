import { Component, OnInit, OnDestroy } from '@angular/core';
import { audit } from 'rxjs/operators';
import { AuthService } from '../../shared/service/auth.service';
import 'rxjs/add/operator/pairwise';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

const settingPages = ['/plan', '/info', '/complete'];

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  subScription: Subscription;
  isSettingPage: boolean = false;

  constructor(
    private router: Router
  ) {
    this.subScription = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.isSettingPage = settingPages.includes(event.url);
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }

}
