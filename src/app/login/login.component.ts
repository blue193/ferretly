import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Login } from '../shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  contactForm: FormGroup;
  contact: Login;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.contact = new Login();
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      email: new FormControl(this.contact.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.contact.password, Validators.required)
    })
  }

  // login() {
  //   this.router.navigate ( [ '' ] );
  // }

  onSubmit() {
    this.router.navigate ( [ '' ] );
    console.log("submit");
  }

  get f() {
    return this.contactForm.controls;
  }
}
