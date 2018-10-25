import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { CompleteContact } from '../../shared/models/completeContact.model';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  contactForm: FormGroup;
  contact: CompleteContact;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.contact = new CompleteContact();
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      card: new FormControl(this.contact.card, Validators.required),
      credit: new FormControl(this.contact.credit, Validators.required),
      month: new FormControl(this.contact.month, Validators.required),
      year: new FormControl(this.contact.year, Validators.required),
      security: new FormControl(this.contact.security, Validators.required),
      checked: new FormControl(this.contact.checked, Validators.pattern('true'))
    });
  }

  onSubmit() {
    this.router.navigate(['/signup/welcome']);
    console.log("submit");
  }
  
  get f() {
    return this.contactForm.controls;
  }
}
