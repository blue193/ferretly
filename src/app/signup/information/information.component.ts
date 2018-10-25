import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Contact } from '../../shared/models/contact.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})

export class InformationComponent implements OnInit {
  
  myEmail: string = '';
  contactForm: FormGroup;
  contact: Contact;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.contact = new Contact();
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      mailAddress: new FormControl(this.contact.mailAddress, [
        Validators.required,
        Validators.email
      ]),
      checked: new FormControl(this.contact.checked, Validators.pattern('true'))
    })
  }

  onSubmit() {
    localStorage.setItem("email", this.myEmail);
    this.router.navigate(['/signup/complete']);
    console.log("submit");
  }
  
  get f() {
    return this.contactForm.controls;
  }
}
