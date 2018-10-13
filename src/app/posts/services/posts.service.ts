import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { mockPosterGroups, mockPostFilterGroups } from '../../shared/static-data';
import { environment } from '../../../environments/environment';

@Injectable()
export class PostsService {
  private posterGroup: BehaviorSubject<any> = undefined;
  changePosterGroup$ = undefined;

  private postFilterGroup: BehaviorSubject<any> = undefined;
  changePostFilterGroup$ = undefined;

  constructor(
    private localStorage: LocalStorageService
  ) {
    this.posterGroup = new BehaviorSubject<any>(this.localStorage.get(environment.localStorage.posterGroup) || mockPosterGroups[0]);
    this.changePosterGroup$ = this.posterGroup.asObservable();
    this.postFilterGroup = new BehaviorSubject<any>(this.localStorage.get(environment.localStorage.postFilter) || mockPostFilterGroups[0]);
    this.changePostFilterGroup$ = this.postFilterGroup.asObservable();
  }

  changePosterGroup(group) {
    this.localStorage.set(environment.localStorage.posterGroup, group);
    this.posterGroup.next(group);
  }

  changePostFilterGroup(filter) {
    this.localStorage.set(environment.localStorage.postFilter, filter);
    this.postFilterGroup.next(filter);
  }
}
