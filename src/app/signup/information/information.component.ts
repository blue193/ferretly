import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})

export class InformationComponent implements OnInit {
  myEmail: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextTo() {
    localStorage.setItem("email", this.myEmail);
    this.router.navigate(['/signup/complete']);
  }
}
