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
  showModify: boolean;
  displayQuote: boolean = false;
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
      description: `Custom Plan`
    }];
    this.selectedPlan = this.plans[0];
  }

  selectPlan(plan) {
    this.displayQuote = false;
     this.selectedPlan = plan;
    if (plan.id === 5) {
      // this.customCredit = 0;
      this.isEnabledAddBtn = false;
      this.showModify = true;
    } else {
      this.isEnabledAddBtn = true;
      this.showModify = false;
      // this.displayQuote = !this.displayQuote;
    }
  }

  modify() {
    // this.showModify = false;
    this.displayQuote = !this.displayQuote;
    console.log("this.showModify = ", this.showModify);
  }
  nextTo() {
    this.router.navigate ( [ '/signup/info' ] );
  }

  getQuote() {
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
