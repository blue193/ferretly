import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  title = undefined;
  content = '';
  dismissBtn = undefined;
  confirmBtn = undefined;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.dismiss('close');
  }

  confirm() {
    this.activeModal.close('confirm');
  }
}
