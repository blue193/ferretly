import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.scss']
})
export class ChangeEmailModalComponent implements OnInit {
  emailForm: FormGroup;
  email = '';

  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]]
    });
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  confirm() {
    this.activeModal.close(this.emailForm.controls.email.value);
  }
}
