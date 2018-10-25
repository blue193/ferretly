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
  isEnabledCustomBtn: boolean = false;
  showCustomPlanQuote: boolean = false;
  isEnabledAddBtn: boolean = true;
  customCredit: 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.customCredit = 0;
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
      description: `Custom Plan: 34 Background Check Cridits($${this.customCredit})`
    }];
    this.selectedPlan = this.plans[0];
  }

  selectPlan(plan) {
     this.selectedPlan = plan;
    if (plan.id === 5) {
      this.customCredit = 0;
      this.isEnabledAddBtn = false;
    } else {
      this.isEnabledAddBtn = true;
    }
  }

  modify() {
    this.isEnabledCustomBtn = true;
  }
  nextTo() {
    this.router.navigate ( [ '/signup/info' ] );
  }

  getQuote() {
    this.plans[4].description = `Custom Plan: 34 Background Check Cridits($${this.customCredit})`;
    this.showCustomPlanQuote = true;
    this.isEnabledAddBtn = true;
  }

  getAnotherQuote() {
    this.showCustomPlanQuote = false;
  }

  onChangeCustomCredit(value) {
    if (value && value > 0 && value < 500) {
      this.isEnabledCustomBtn = true;
    } else {
      this.isEnabledCustomBtn = false;
    }
    this.isEnabledAddBtn = false;
  }

}
