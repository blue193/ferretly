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
      bill: new FormControl(this.contact.bill, Validators.required),
      lastName: new FormControl(this.contact.lastName, Validators.required),
      companyName: new FormControl(this.contact.companyName, Validators.required),
      mailAddress: new FormControl(this.contact.mailAddress, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.contact.password, Validators.required),
      confirmPwd: new FormControl(this.contact.confirmPassword, Validators.required),
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
