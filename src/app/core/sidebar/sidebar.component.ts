import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MessageModalComponent } from '../message-modal/message-modal.component';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  options = {
    lang: 'en',
    theme: 'winter',
    settings: false,
    docked: false,
    boxed: false,
    opened: false
  };
  backgroundCheckSub: Subscription;
  backgroundCheck = 1;

  @Output() messageEvent = new EventEmitter<Object>();
  @Output() toggleFullscreen = new EventEmitter<void>();

  constructor (
    public translate: TranslateService,
    private paymentConfirmModalService: NgbModal,
    private sharedService: SharedService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.backgroundCheckSub = this.sharedService.changeBackgroundCheck$.subscribe(check => {
      this.backgroundCheck = check;
    });
  }

  ngOnDestroy() {
    this.backgroundCheckSub.unsubscribe();
  }

  sendMessage() {
    this.messageEvent.emit(this.options);
  }

  setTheme(theme) {
    this.options.theme = theme;
    this.sendMessage();
  }

  openBgCheckModal() {
    const modalRef = this.paymentConfirmModalService.open(
      MessageModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.title = 'Payment Confirmation';
    modalRef.componentInstance.content = `You are about to add 3 background check credits to your account. $100 will be charged to your card immediately.`;
    modalRef.componentInstance.dismissBtn = 'Cancel';
    modalRef.componentInstance.confirmBtn = 'Confirm';
    modalRef.result
    .then(result => {})
    .catch(reason => {});
  }
}
