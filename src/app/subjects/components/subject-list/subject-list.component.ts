import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RunCheckModalComponent } from '../run-check-modal/run-check-modal.component';
import { SubjectAddComponent } from '../subject-add/subject-add.component';
import { MessageModalComponent } from '../../../core/message-modal/message-modal.component';

import { SubjectsService } from '../../services/subjects.service';

import { mockSubjectsData } from '../../interfaces/static-data';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjects = undefined;
  selSubjects = [];
  selectedSubjectCount = 0;
  isSelectedAll = false;

  constructor(
    private runCheckModalService: NgbModal,
    private addSubjectModalService: NgbModal,
    private messageModalService: NgbModal,
    private subjectService: SubjectsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subjectService.getSubjectList().subscribe(res => {
      this.subjects = res;
    });
  }

  selectSubject() {
    this.selectedSubjectCount = this.subjects.filter(
      subject => subject.isSelected
    ).length;

    if (this.selectedSubjectCount === this.subjects.length) {
      this.isSelectedAll = true;
    } else {
      this.isSelectedAll = false;
    }
  }

  selectAllSubjects(isSelAll) {
    this.selectedSubjectCount = 0;
    this.isSelectedAll = isSelAll;
    this.subjects.map(subject => {
      subject.isSelected = isSelAll;
    });

    if (isSelAll) {
      this.selectedSubjectCount = this.subjects.length;
    }
  }

  getCheckValueBGColor(subject) {
    if (subject.checkValue < 400) {
      return 'red';
    } else if (subject.checkValue < 600) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  runCheck(selectedSubject = null) {
    if (!selectedSubject) {
      this.selSubjects = this.subjects.filter(
        subject => subject.isSelected
      );
    } else {
      this.selSubjects = [selectedSubject];

      this.subjects.map(subject => {
        if (subject.id === selectedSubject.id) {
          subject.isSelected = true;
        }
      });
      this.selectSubject();
    }

    const modalRef = this.runCheckModalService.open(
      RunCheckModalComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.subjects = this.selSubjects;
    modalRef.result
    .then(result => {
      this.selSubjects.map(subject => {
        subject.isSelected = false;
      });
      this.selectSubject();
    })
    .catch(reason => {
      this.selSubjects.map(subject => {
        subject.isSelected = false;
      });
      this.selectSubject();
    });
  }

  addSubject(selectedSubject = null) {
    const modalRef = this.addSubjectModalService.open(
      SubjectAddComponent,
      {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      }
    );

    if (selectedSubject) {
      selectedSubject.isSelected = true;
    }
    modalRef.componentInstance.subject = selectedSubject;
    modalRef.result
    .then(result => {
      if (selectedSubject) {
        selectedSubject.isSelected = false;
      }
    })
    .catch(reason => {
      if (selectedSubject) {
        selectedSubject.isSelected = false;
      }
    });
  }

  redirectToDashboard(subject) {
    if (!subject.isChecked) {
      return;
    }

    this.router.navigate(['']);
  }
}
