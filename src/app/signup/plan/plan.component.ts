import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  plans: any[];
  selectedPlan: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.plans = [{
      id: 1,
      description: 'Free(Add Credits Later)'
    }, {
      id: 2,
      description: '1 Background Check Credit($29)'
    }, {
      id: 3,
      description: '5 Background Check Cridits($115)'
    }, {
      id: 4,
      description: '10 Background Check Cridits($195)'
    }, {
      id: 5,
      description: 'Custom Plan: 34 Background Check Cridits($476)'
    }];
    this.selectedPlan = this.plans[0];
  }

  selectPlan(plan) {
    this.selectedPlan = plan;
  }

  nextTo() {
    this.router.navigate ( [ '/signup/info' ] );
  }
}
