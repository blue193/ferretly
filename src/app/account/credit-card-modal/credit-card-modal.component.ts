import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-card-modal',
  templateUrl: './credit-card-modal.component.html',
  styleUrls: ['./credit-card-modal.component.scss']
})
export class CreditCardModalComponent implements OnInit {
  creditForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.creditForm = this.fb.group({
      userName: ['', Validators.required],
      creditCard: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      securityCode: ['', Validators.required]
    });
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  confirm() {
    this.activeModal.close('close');
  }
}
