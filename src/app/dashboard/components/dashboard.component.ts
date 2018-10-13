import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as shape from 'd3-shape';
import { mockPosterGroups } from '../../shared/static-data';

import { DashboardService } from '../services/dashboard.service';
import { SharedService } from '../../shared/service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements AfterViewInit, OnDestroy {
  dateData: any[];
  showSentiment = true;
  badgeHover = -1;
  selectedBadge = -1;
  posterGroupSub: Subscription;

  gaugeOptions = {
    data: [{
      name: 'Score',
      value: 345
    }],
    min: 0,
    max: 1000,
    largeSegments: 4,
    smallSegments: 0,
    textValue: '',
    units: 'Poor',
    angleSpan: 240,
    startAngle: -120,
    showAxis: true,
    color: {
      domain: ['#b8453a']
    },
    margin: [
      50, 10, 10, 10
    ]
  };

  badgeCardData = [{
    name: 'Insults and Bullying',
    color: '#b8453a',
    value: 10
  }, {
    name: 'Self-Harm',
    color: '#e8b200',
    value: 24
  }, {
    name: 'Narcotics',
    color: '#e46500',
    value: 5
  }, {
    name: 'Threat of Violence',
    color: '#57afce',
    value: 1
  }, {
    name: 'Political Extremism',
    color: '#696b9c',
    value: 5
  }, {
    name: 'Toxic Language',
    color: '#808080',
    value: 0
  }, {
    name: 'Obscene Language',
    color: '#5000ed',
    value: 1
  }, {
    name: 'Violent Images',
    color: '#8f00f9',
    value: 5
  }, {
    name: 'Hate Speech',
    color: '#b8453a',
    value: 18
  }, {
    name: 'Explicit Images',
    color: '#808080',
    value: 0
  }, {
    name: 'Drugs/Drinking Images',
    color: '#808080',
    value: 0
  }, {
    name: 'Keyword Match',
    color: '#4175ec',
    value: 2
  }];

  pieChartData = {
    data: [{
      name: 'Neutral',
      value: 165
    }, {
      name: 'Good',
      value: 480
    }, {
      name: 'Bad',
      value: 745
    }],
    color: {
      domain: ['#e8b200', '#60fe00', '#b8453a']
    }
  };

  keywordData = {
    data: [{
      name: 'Democrats',
      value: 22
    }, {
      name: 'Immigration',
      value: 9
    }, {
      name: 'Russia',
      value: 10
    }, {
      name: 'Nancy Pelosi',
      value: 24
    }, {
      name: 'Meeting',
      value: 18
    }],
    color: {
      domain: ['#b8453a', '#e8b200', '#e8b200', '#60fe00', '#b8453a']
    }
  };

  lineChartData = {
    data: [],
    color: {
      domain: ['#b8453a', '#6ccc00', '#c03395']
    },
    schemeType: 'ordinal',
    curve: shape.curveBasis,
    rangeFillOpacity: 0.15
  };

  posters = mockPosterGroups;
  poster = this.posters[0];

  triggeredPosts = [{
    socialType: 'assets/images/twitter-logo.png',
    title: '@realdonaldtrump Delete your account.',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
            + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
            + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
            + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
            + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
            + 'labore sustainable VHS.',
    contentImage: null,
    postDate: '2 min ago'
  }, {
    socialType: 'assets/images/facebook-logo.png',
    title: 'This day sucks. So depressed.',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
            + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
            + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
            + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
            + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
            + 'labore sustainable VHS.',
    contentImage: '/assets/images/unsplash/21.jpg',
    postDate: 'Yesterday'
  }, {
    socialType: 'assets/images/instagram-logo.png',
    title: 'We want to further strengthen this trade relationship to the benefit of all American and European citizens',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
            + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
            + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
            + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
            + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
            + 'labore sustainable VHS.',
    contentImage: null,
    postDate: '1 week ago'
  }, {
    socialType: 'assets/images/twitter-logo.png',
    title: '@realdonaldtrump Delete your account.',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
              + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
              + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
              + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
              + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
              + 'labore sustainable VHS.',
    contentImage: '/assets/images/unsplash/5.jpg',
    postDate: '2 min ago'
  }, {
    socialType: 'assets/images/facebook-logo.png',
    title: 'This day sucks. So depressed.',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
              + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
              + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
              + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
              + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
              + 'labore sustainable VHS.',
    contentImage: null,
    postDate: 'Yesterday'
  }, {
    socialType: 'assets/images/instagram-logo.png',
    title: 'We want to further strengthen this trade relationship to the benefit of all American and European citizens',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
              + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
              + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
              + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
              + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
              + 'labore sustainable VHS.',
    contentImage: '/assets/images/unsplash/19.jpg',
    postDate: '1 week ago'
  }, {
    socialType: 'assets/images/twitter-logo.png',
    title: '@realdonaldtrump Delete your account.',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
              + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
              + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
              + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
              + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
              + 'labore sustainable VHS.',
    contentImage: '/assets/images/unsplash/4.jpg',
    postDate: '2 min ago'
  }, {
    socialType: 'assets/images/facebook-logo.png',
    title: 'This day sucks. So depressed.',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
              + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
              + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
              + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
              + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
              + 'labore sustainable VHS.',
    contentImage: null,
    postDate: 'Yesterday'
  }, {
    socialType: 'assets/images/instagram-logo.png',
    title: 'We want to further strengthen this trade relationship to the benefit of all American and European citizens',
    content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia'
              + 'aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,'
              + 'sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,'
              + 'craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings'
              + 'occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus'
              + 'labore sustainable VHS.',
    contentImage: null,
    postDate: '1 week ago'
  }];

  constructor(
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) {
    this.lineChartData.data = this.getLineChartData();

    this.posterGroupSub = this.sharedService.changePosterGroup$.subscribe(group => {
      this.poster = group;
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.posterGroupSub.unsubscribe();
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  getBadgeBGColor(isShow, selectedBadgeIndex, badge) {
    if (selectedBadgeIndex !== -1 && badge.value) {
      return badge.color;
    }

    if (isShow !== -1 && badge.value) {
      return badge.color;
    }
  }

  getBadgeBorderColor(isShow, badge) {
    if (isShow !== -1 && badge.value) {
      return badge.color;
    }
  }

  clickBadge(index) {
    this.selectedBadge = index;
    console.log(this.selectedBadge);
  }

  getLineChartData() {
    const results = [];
    const domain: Date[] = []; // array of time stamps in milliseconds
    const sentimentNames = ['Negative', 'Positive'];

    for (let j = 0; j < 8; j++) {
      // random dates between Sep 12, 2016 and Sep 24, 2016
      domain.push(new Date(Math.floor(1473700105009 +  Math.random() * 1000000000)));
    }

    for (let i = 0; i < 2; i++) {
      const sentimentType = sentimentNames[i];
      const series = {
        name: sentimentType,
        series: []
      };

      for (let j = 0; j < domain.length; j++) {
        const value = Math.floor(2 + Math.random() * 5);
        // let timestamp = Math.floor(1473700105009 + Math.random() * 1000000000);
        const timestamp = domain[j];
        series.series.push({
          value,
          name: timestamp
        });
      }

      results.push(series);
    }
    return results;
  }

  onChangePoster(poster) {
    this.sharedService.changePosterGroup(poster);
  }
}
