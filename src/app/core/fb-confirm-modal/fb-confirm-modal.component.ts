import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fbconfirm-modal',
  templateUrl: './fb-confirm-modal.component.html',
  styleUrls: ['./fb-confirm-modal.component.scss']
})
export class FBConfirmModalComponent implements OnInit {
  handle = undefined;
  password = '';
  confirmPass = '';
  misMatchPass = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  confirm() {
    if (!this.handle || !this.password || !this.confirmPass) {
      return;
    }

    if (this.password !== this.confirmPass) {
      this.misMatchPass = true;
      return;
    }

    this.activeModal.close('close');
  }

  public closeAlert() {
    this.misMatchPass = false;
  }
}
