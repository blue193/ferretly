import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-run-check-modal',
  templateUrl: './run-check-modal.component.html',
  styleUrls: ['./run-check-modal.component.scss']
})
export class RunCheckModalComponent implements OnInit {
  subjects = [];
  agree = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {}

  runCheck() {
    if (this.agree) {
      this.subjects.map(subject => {
        subject.checkValue = Math.floor(Math.random() * 1000);
        subject.checkDate = this.getFormatedDate();
        subject.isChecked = true;
      });
      this.activeModal.close(this.subjects);
    }
  }

  cancel() {
    this.activeModal.dismiss('canel');
  }

  getFormatedDate() {
    let localDateTime = '';
    const utcTime = new Date().toUTCString();
    const localTime = new Date().toLocaleTimeString();
    localDateTime = utcTime.substr(0, utcTime.length - 12);
    localDateTime += localTime.substr(0, localTime.length - 6);
    return localDateTime;
  }
}
