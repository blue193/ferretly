import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextTo() {
    this.router.navigate(['/signup/welcome']);
  }
}
