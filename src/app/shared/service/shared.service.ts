import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

import { environment } from '../../../environments/environment';
import { mockPosterGroups, mockPostFilterGroups } from '../static-data';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  mockPosterGroups = mockPosterGroups;
  private posterGroup: BehaviorSubject<any> = undefined;
  changePosterGroup$ = undefined;

  private postFilterGroup: BehaviorSubject<any> = undefined;
  changePostFilterGroup$ = undefined;

  private backgroundCheck: Subject<any> = new Subject<any>();
  changeBackgroundCheck$ = undefined;

  constructor(
    private localStorage: LocalStorageService
  ) {
    this.posterGroup = new BehaviorSubject<any>(this.localStorage.get(environment.localStorage.posterGroup) || mockPosterGroups[0]);
    this.changePosterGroup$ = this.posterGroup.asObservable();
    this.postFilterGroup = new BehaviorSubject<any>(this.localStorage.get(environment.localStorage.postFilter) || mockPostFilterGroups[0]);
    this.changePostFilterGroup$ = this.postFilterGroup.asObservable();

    this.changeBackgroundCheck$ = this.backgroundCheck.asObservable();
  }

  changePosterGroup(group) {
    this.localStorage.set(environment.localStorage.posterGroup, group);
    this.posterGroup.next(group);
  }

  changePostFilterGroup(filter) {
    this.localStorage.set(environment.localStorage.postFilter, filter);
    this.postFilterGroup.next(filter);
  }

  addNewPosterGroup(subject) {
    this.mockPosterGroups.push({
      id: this.mockPosterGroups.length,
      name: subject.name
    });
  }

  changeBackgroundCheck(check) {
    this.backgroundCheck.next(check);
  }
}
