import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PostsService } from '../../services/posts.service';
import { SharedService } from '../../../shared/service/shared.service';

import { mockPosterGroups, mockPostFilterGroups } from '../../../shared/static-data';

@Component({
  selector: 'app-post-layout',
  templateUrl: './post-layout.component.html',
  styleUrls: ['./post-layout.component.scss']
})
export class PostLayoutComponent implements OnInit, OnDestroy {
  posterGroups = mockPosterGroups;
  selectedPosterGroup = undefined;
  postFilterGroups = mockPostFilterGroups;
  selectedFilterGroup = undefined;

  posterGroupSub: Subscription;
  postFilterGroupSub: Subscription;

  isGridView = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private sharedService: SharedService
  ) {
    this.posterGroupSub = this.sharedService.changePosterGroup$.subscribe(group => {
      this.selectedPosterGroup = group;
    });

    this.postFilterGroupSub = this.sharedService.changePostFilterGroup$.subscribe(filter => {
      this.selectedFilterGroup = filter;
    });
  }

  ngOnInit() {
    if (this.router.url.substring(this.router.url.lastIndexOf('/')) === '/grid') {
      this.isGridView = true;
    } else {
      this.isGridView = false;
    }
  }

  ngOnDestroy() {
    this.posterGroupSub.unsubscribe();
    this.postFilterGroupSub.unsubscribe();
  }

  onGridView() {
    this.isGridView = true;
    this.router.navigate(['grid'], { relativeTo: this.route });
  }

  onListView() {
    this.isGridView = false;
    this.router.navigate(['list'], { relativeTo: this.route });
  }

  onChangePosterGroup(group) {
    // this.postsService.changePosterGroup(group);
    this.sharedService.changePosterGroup(group);
  }

  onChangePostFilter(filter) {
    // this.postsService.changePostFilterGroup(filter);
    this.sharedService.changePostFilterGroup(filter);
  }
}
