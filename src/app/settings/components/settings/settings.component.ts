import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEmailModalComponent } from '../change-email-modal/change-email-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isEnabledKeyword = false;
  items = ['Sucks', 'Fuck', 'Test', 'Bullying/Insults', 'Toxic Languages', 'Self Harm', 'Obscene Language', 'Narcotics'];
  settingsForm: FormGroup;
  isEnabledBackgroundReport = true;
  isEnabledNegativeSentiment = false;
  isEnabledPositiveSentiment = false;
  isEnabledFlaggedPost = true;
  email = 'billsmith@yahoo.com';

  constructor(
    private fb: FormBuilder,
    private changeEmailModalService: NgbModal
  ) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onChangeKeywords(event) {
    console.log(event);
  }

  onSelected(item) {
    console.log('onSelected = ', item);
  }

  onItemRemoved(item) {
    console.log('onItemRemoved = ', item);
  }

  updateInfo() {
    console.log(this.settingsForm);
  }

  onChangeEmail() {
    const modalRef = this.changeEmailModalService.open(
      ChangeEmailModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.email = this.email;
    modalRef.result
    .then(result => {
      this.email = result;
    })
    .catch(reason => {});
  }
}
