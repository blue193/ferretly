import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  nextTo() {
    this.router.navigate(['']);
  }

}
