import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from '../../../shared/service/shared.service';
import { mockPosters, mockPosts, mockPostFilterGroups } from '../../../shared/static-data';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  posterGroupSub: Subscription;
  postFilterGroupSub: Subscription;

  posters: any[] = [];
  posts: any[] = [];
  imagePosts: any[] = [];
  selectedPoster: any = undefined;
  currentFilter: any = mockPostFilterGroups[0];
  images: any[] = [];
  num = 1;
  warningToolTipContent = 'This is a tooltip';

  constructor(
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
  ) {
    this.posterGroupSub = this.sharedService.changePosterGroup$.subscribe(group => {
      this.posters = mockPosters.filter(mockPoster => mockPoster.groupId === group.id);
      this.selectedPoster = this.posters[0];

      this.onChangePoster(this.selectedPoster);
    });

    this.postFilterGroupSub = this.sharedService.changePostFilterGroup$.subscribe(filter => {
      this.currentFilter = filter;
      this.onChangePoster(this.selectedPoster);
    });
  }

  ngOnInit() {
    for ( this.num; this.num <= 20; this.num += 1 ) {
      this.images.push( this.num );
    }
  }

  ngOnDestroy() {
    this.posterGroupSub.unsubscribe();
    this.postFilterGroupSub.unsubscribe();
  }

  onChangePoster(poster) {
    this.spinner.show();
    this.selectedPoster = poster;
    this.posts = mockPosts.filter(mockPost => mockPost.posterId === poster.id);
    this.filterPosts(this.currentFilter);
    this.spinner.hide();
  }

  getSentimentColor(sentiment) {
    switch (sentiment) {
      case 1:
        return '#60b525';
      case 2:
        return '#d9bb0d';
      case 3:
        return 'red';
    }
  }

  filterPosts(filter) {
    switch (filter.id) {
      case 1:
        this.posts = this.posts.filter(post => post.content.sentiment === 3);
        break;
      case 2:
        this.posts = this.posts.filter(post => post.content.warning);
        break;
    }
    this.imagePosts = this.posts.filter(post => post.content.image);
  }
}
