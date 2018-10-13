import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from '../../../shared/service/shared.service';
import { mockPosters, mockPosts, mockPostFilterGroups } from '../../../shared/static-data';

declare var Muuri: any;
declare var imagesLoaded: any;

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss']
})
export class PostGridComponent implements OnInit, OnDestroy {
  posterGroupSub: Subscription;
  postFilterGroupSub: Subscription;

  posters: any[] = [];
  posts: any[] = [];
  selectedGroup: any = undefined;
  currentFilter: any = mockPostFilterGroups[0];
  muuriHandler = undefined;
  warningToolTipContent = 'This is tooltip';
  selectedPost: any = undefined;
  testPosts: any[] = [];

  constructor(
    private sharedService: SharedService,
    private spinner: NgxSpinnerService
  ) {
    this.posterGroupSub = this.sharedService.changePosterGroup$.subscribe(group => {
      this.selectedGroup = group;

      this.filterByGroup(this.selectedGroup);
      this.filterPosts(this.currentFilter);
      this.redrawGridItems();
    });

    this.postFilterGroupSub = this.sharedService.changePostFilterGroup$.subscribe(filter => {
      this.currentFilter = filter;
      this.filterByGroup(this.selectedGroup);
      this.filterPosts(filter);
      this.redrawGridItems();
    });
  }

  ngOnInit() {
    this.redrawGridItems();
  }

  ngOnDestroy() {
    if (this.muuriHandler) {
      this.muuriHandler.destroy();
      delete this.muuriHandler;
    }
    this.posterGroupSub.unsubscribe();
  }

  filterByGroup(group) {
    this.posts = [];
    this.posters = mockPosters.filter(poster => poster.groupId === group.id);
    this.posters.map(poster => {
      mockPosts.map(post => {
        if (post.posterId === poster.id) {
          this.posts.push({
            poster: poster,
            post: post
          });
        }
      });
    });
  }

  redrawGridItems() {
    this.spinner.show();
    setTimeout(() => {
      if (this.muuriHandler) {
        this.muuriHandler.destroy();
        delete this.muuriHandler;
      }

      this.muuriHandler = new Muuri('.grid', {
        dragEnabled: true,
        layout: {
          rounding: false
        }
      });

      const muuriHandler = this.muuriHandler;
      imagesLoaded( '.grid-container', function() {
        console.log('image loaded');
        muuriHandler.refreshItems().layout();
      });
      this.spinner.hide();
    }, 500);
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
        this.posts = this.posts.filter(post => post.post.content.sentiment === 3);
        return;
      case 2:
        this.posts = this.posts.filter(post => post.post.content.warning);
        return;
    }
    // // For the test
    // if (this.posts.length) {
    //   this.testPosts = this.posts;
    // }
    this.selectedPost = this.posts[0];
  }

  onChangePost(post) {
    this.selectedPost = post;
  }
}
