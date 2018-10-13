import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProfileSearchComponent } from '../profile-search/profile-search.component';
import { FBConfirmModalComponent } from '../../../core/fb-confirm-modal/fb-confirm-modal.component';
import { RunCheckModalComponent } from '../run-check-modal/run-check-modal.component';

import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.scss']
})
export class SubjectAddComponent implements OnInit, OnDestroy {
  subject = undefined;
  isEdit = false;
  name = '';
  instagram = '';
  facebook = '';
  twitter = '';
  isAvailableSearch = false;

  nameTyping$: Subject<any> = new Subject<any>();
  nameTypingS: Subscription = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private profileSearchModalService: NgbModal,
    private FBModalService: NgbModal,
    private runCheckModalService: NgbModal,
    private fb: FormBuilder,
    private subjectService: SubjectsService
  ) {}

  ngOnInit() {
    this.nameTypingS = this.nameTyping$
    .debounceTime(300)
    .subscribe(change => {
      this.checkAvailableName();
    });

    if (this.subject) {
      this.isEdit = true;
      this.name = this.subject.name;
      this.instagram = this.subject.instagramHandle;
      this.facebook = this.subject.facebookHandle;
      this.twitter = this.subject.twitterHandle;
      this.checkAvailableName();
    }
  }

  ngOnDestroy() {
    this.nameTypingS.unsubscribe();
  }

  onFindProfile(profileType) {
    if (!this.isAvailableSearch) {
      return;
    }

    if (profileType === 'Facebook') {
      const fbModalRef = this.FBModalService.open(
        FBConfirmModalComponent,
        {
          size: 'lg',
          centered: true,
          backdrop: 'static'
        }
      );

      fbModalRef.result
      .then(result => {
        this.openProfileSearchModal(profileType);
      })
      .catch(reason => {
      });
    } else {
      this.openProfileSearchModal(profileType);
    }
  }

  openProfileSearchModal(profileType) {
    const modalRef = this.profileSearchModalService.open(
      ProfileSearchComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.searchType = profileType;
    modalRef.componentInstance.profileName = this.name;
    modalRef.result
    .then(result => {
      switch (profileType) {
        case 'Instagram':
          this.instagram = result.instagramHandle;
          break;
        case 'Facebook':
          this.facebook = result.facebookHandle;
          break;
        case 'Twitter':
          this.twitter = result.twitterHandle;
          break;
      }
    })
    .catch(reason => {
    });
  }

  checkAvailableName() {
    if (this.name.indexOf(' ') > 0 && this.name.indexOf(' ') < this.name.length - 1) {
      this.isAvailableSearch = true;
    } else {
      this.isAvailableSearch = false;
    }
  }

  addSubject() {
    if (this.isEdit) {
      this.subject.name = this.name;
      this.subject.twitterHandle = this.twitter;
      this.subject.instagramHandle = this.instagram;
      this.subject.facebookHandle = this.facebook;

      this.subject = this.subjectService.editSubject(this.subject);
    } else {
      this.subject = this.subjectService.addNewSubject({
        name: this.name,
        instagramHandle: this.instagram,
        facebookHandle: this.facebook,
        twitterHandle: this.twitter
      });
    }
  }

  openRunCheckModal() {
    const runCheckModalRef = this.runCheckModalService.open(
      RunCheckModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    runCheckModalRef.componentInstance.subjects = [this.subject];
    runCheckModalRef.result
    .then(res => {
      this.activeModal.close('saved');
    })
    .catch(reason => {
      if (!this.isEdit) {
        this.subjectService.removeSubject(this.subject);
      }
    });
  }

  saveAndClose() {
    if (!this.isAvailableSearch || (!this.instagram && !this.facebook && !this.twitter)) {
      return;
    }

    if (this.facebook) {
      const modalRef = this.FBModalService.open(
        FBConfirmModalComponent,
        {
          size: 'lg',
          centered: true,
          backdrop: 'static'
        }
      );

      modalRef.result
      .then(result => {
        this.addSubject();
        this.activeModal.close('saved');
      })
      .catch(reason => {
      });
    } else {
      this.addSubject();
      this.activeModal.close('saved');
    }
  }

  saveAndNew() {
    if (!this.isAvailableSearch || (!this.instagram && !this.facebook && !this.twitter)) {
      return;
    }

    if (this.facebook) {
      const modalRef = this.FBModalService.open(
        FBConfirmModalComponent,
        {
          size: 'lg',
          centered: true,
          backdrop: 'static'
        }
      );

      modalRef.result
      .then(result => {
        this.addSubject();
        this.isEdit = false;
        this.subject = undefined;
        this.name = '';
        this.instagram = '';
        this.facebook = '';
        this.twitter = '';
        this.isAvailableSearch = false;
      })
      .catch(reason => {
      });
    } else {
      this.addSubject();
      this.isEdit = false;
      this.subject = undefined;
      this.name = '';
      this.instagram = '';
      this.facebook = '';
      this.twitter = '';
      this.isAvailableSearch = false;
    }
  }

  saveAndRunCheck() {
    if (!this.isAvailableSearch || (!this.instagram && !this.facebook && !this.twitter)) {
      return;
    }

    if (this.facebook) {
      const modalRef = this.FBModalService.open(
        FBConfirmModalComponent,
        {
          size: 'lg',
          centered: true,
          backdrop: 'static'
        }
      );

      modalRef.result
      .then(result => {
        this.addSubject();
        this.openRunCheckModal();
      })
      .catch(reason => {
      });
    } else {
      this.addSubject();
      this.openRunCheckModal();
    }
  }

  close() {
    this.activeModal.dismiss('cancel');
  }
}
