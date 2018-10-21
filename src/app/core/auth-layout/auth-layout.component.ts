import { Component, OnInit, OnDestroy } from '@angular/core';
import { audit } from 'rxjs/operators';
import { AuthService } from '../../shared/service/auth.service';
import 'rxjs/add/operator/pairwise';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

const settingUrls = ['/plan', '/info', '/complete'];

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  subScription: Subscription;
  isSettingUrl: boolean = false;

  constructor(
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.subScription = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event:NavigationStart) => {
        console.log(event.url);
        setTimeout(() => {
          this.isSettingUrl = settingUrls.includes(event.url);
        }, 100);
        
        console.log(this.isSettingUrl, event.url);
      });
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }

}
