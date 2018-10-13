import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { mockSubjectsData } from '../interfaces/static-data';
import { SharedService } from '../../shared/service/shared.service';

@Injectable()
export class SubjectsService {
  mockSubjectData = mockSubjectsData;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService
  ) { }

  getSubjectList() {
    return Observable.of(this.mockSubjectData);
  }

  addNewSubject(subject) {
    const tempSubject = {
      id: this.mockSubjectData.length,
      avatar: `/assets/images/face2.jpg`,
      name: subject.name,
      biography: 'new subject',
      date: this.getFormatedDate(),
      isChecked: false,
      checkValue: 0,
      checkDate: '',
      isSelected: false,
      twitterHandle: subject.twitterHandle,
      facebookHandle: subject.facebookHandle,
      instagramHandle: subject.instagramHandle
    };

    this.mockSubjectData.unshift(tempSubject);
    this.sharedService.addNewPosterGroup(tempSubject);
    return tempSubject;
  }

  editSubject(subject) {
    const selSubject = this.mockSubjectData.filter(item => {
      return item.id === subject.id;
    })[0];
    selSubject.name = subject.name;
    selSubject.twitterHandle = subject.twitterHandle;
    selSubject.instagramHandle = subject.instagramHandle;
    selSubject.facebookHandle = subject.facebookHandle;

    this.sharedService.addNewPosterGroup(selSubject);
    return selSubject;
  }

  addAndRunCheckSubject(subject) {
    const tempSubject = {
      id: this.mockSubjectData.length,
      avatar: `/assets/images/face2.jpg`,
      name: subject.name,
      biography: 'new subject',
      date: this.getFormatedDate(),
      isChecked: false,
      checkValue: null,
      checkDate: '',
      isSelected: false,
      twitterHandle: subject.twitterHandle,
      facebookHandle: subject.facebookHandle,
      instagramHandle: subject.instagramHandle
    };

    this.mockSubjectData.unshift(tempSubject);
    this.sharedService.addNewPosterGroup(tempSubject);
    return tempSubject;
  }

  editAndRunCheckSubject(subject) {
    const selSubject = this.mockSubjectData.filter(item => {
      return item.id === subject.id;
    })[0];
    selSubject.name = subject.name;
    selSubject.twitterHandle = subject.twitterHandle;
    selSubject.instagramHandle = subject.instagramHandle;
    selSubject.facebookHandle = subject.facebookHandle;
    selSubject.checkValue = null;
    selSubject.checkDate = '';
    selSubject.isChecked = false;
    this.sharedService.addNewPosterGroup(selSubject);
    return selSubject;
  }

  removeSubject(subject) {
    this.mockSubjectData = this.mockSubjectData.filter(item => {
      return item.id !== subject.id;
    });
  }

  searchSubject(names: string[]) {
    const searchedSubjects = [];
    names.map(name => {
      const subjects = this.mockSubjectData.filter(subject => {
        return subject.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      });

      subjects.map(subject => {
        if (searchedSubjects.filter(item => item.id === subject.id).length > 0) {
          return;
        } else {
          searchedSubjects.push(subject);
        }
      });
    });

    return searchedSubjects;
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
