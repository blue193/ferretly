import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MessageModalComponent } from '../../core/message-modal/message-modal.component';
import { CreditCardModalComponent } from '../credit-card-modal/credit-card-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../shared/service/shared.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  creditsOption = 1;
  customCredit = null;
  backgroundCheck = 1;
  isEnabledCustomBtn = false;
  isEnabledAddBtn = true;
  showCustomPlanQuote = false;
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentConfirmModalService: NgbModal,
    private paymentUpdateModalService: NgbModal,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  updateInfo() {
    console.log(this.creditsOption);
    this.backgroundCheck = this.creditsOption;
  }

  onChangeCustomCredit(value) {
    if (value && value > 0 && value < 500) {
      this.isEnabledCustomBtn = true;
    } else {
      this.isEnabledCustomBtn = false;
    }
    this.isEnabledAddBtn = false;
  }

  onChangeCreditOption(value) {
    if (value === -1) {
      this.customCredit = null;
      this.isEnabledAddBtn = false;
    } else {
      this.isEnabledAddBtn = true;
    }
  }

  openConfirmModal() {
    if (!this.isEnabledAddBtn) {
      return;
    }
    let confirmMsgContent = '';

    switch (this.creditsOption) {
      case 1:
        this.customCredit = this.creditsOption;
        confirmMsgContent = `You are about to add 1 background check credits to your account. $29 will be charged to your card immediately.`;
        break;
      case 5:
        this.customCredit = this.creditsOption;
        confirmMsgContent = `You are about to add 5 background check credits to your account. $115 will be charged to your card immediately.`;
        break;
      case 10:
        this.customCredit = this.creditsOption;
        confirmMsgContent = `You are about to add 10 background check credits to your account. $195 will be charged to your card immediately.`;
        break;
      case -1:
        confirmMsgContent = `You are about to add ${this.customCredit} background check credits to your account. $xx will be charged to your card immediately.`;
      break;
    }
    const modalRef = this.paymentConfirmModalService.open(
      MessageModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.title = 'Payment Confirmation';
    modalRef.componentInstance.content = confirmMsgContent;
    modalRef.componentInstance.dismissBtn = 'Cancel';
    modalRef.componentInstance.confirmBtn = 'Confirm';
    modalRef.result
    .then(result => {
      this.backgroundCheck = this.customCredit;
      this.sharedService.changeBackgroundCheck(this.backgroundCheck);
    })
    .catch(reason => {});
  }

  getQuote() {
    this.showCustomPlanQuote = true;
    this.isEnabledAddBtn = true;
  }

  getAnotherQuote() {
    this.showCustomPlanQuote = false;
  }

  updateCreditCardInfo() {
    const modalRef = this.paymentUpdateModalService.open(
      CreditCardModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    modalRef.result
    .then(result => {})
    .catch(reason => {});
  }
}
