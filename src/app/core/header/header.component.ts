import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { notificationData } from '../../shared/static-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() heading: string;
  @Output() toggleSidenav = new EventEmitter<void>();

  notifications = notificationData;

  constructor(
    private router: Router
  ) { }

  onClickMyAccount() {
    this.router.navigate(['account/profile']);
  }
}
