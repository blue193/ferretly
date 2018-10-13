import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { mockSubjectsData } from '../../interfaces/static-data';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss']
})
export class ProfileSearchComponent implements OnInit {
  searchType = '';
  profileName = '';
  profileTypeImage = '';
  subjectsData = mockSubjectsData;
  filteredSubjects = [];
  handleType = '';
  selectedSubject = undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private subjectService: SubjectsService
  ) { }

  ngOnInit() {
    switch (this.searchType) {
      case 'Instagram':
        this.profileTypeImage = '/assets/images/instagram-logo.png';
        this.handleType = 'instagramHandle';
        break;
      case 'Facebook':
        this.profileTypeImage = '/assets/images/facebook-logo.png';
        this.handleType = 'facebookHandle';
        break;
      case 'Twitter':
        this.profileTypeImage = '/assets/images/twitter-logo.png';
        this.handleType = 'twitterHandle';
        break;
    }

    this.searchProfiles();
  }

  searchProfiles() {
    const names = this.profileName.split(' ');
    this.filteredSubjects = this.subjectService.searchSubject(names);
  }

  selectSubject(subject) {
    this.selectedSubject = subject;
  }

  save() {
    this.activeModal.close(this.selectedSubject);
  }

  cancel() {
    this.activeModal.dismiss('canel');
  }
}
