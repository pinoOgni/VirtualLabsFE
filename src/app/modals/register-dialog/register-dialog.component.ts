import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/form-models';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  serverErrors: string;
  registerForm: FormGroup;
  model: RegisterModel;
  
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.model = {email: '', firstName: '', lastName: '', password: '' , password2: '', idNumber: ''};
    this.registerForm = this.formBuilder.group ({
      idNumber: ['',Validators.pattern('^(s|d)[0-9]+$')],
      email: ['', Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(polito|studenti.polito)\.it$/)],
      firstName: ['',Validators.pattern('^[A-Za-z]{2,20}$')],
      lastName: ['',Validators.pattern('^[A-Za-z]{2,20}$')],
      password: ['', Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)],
      password2: [''],
    },
    {
      validator: this.equalValuePasswords('password', 'password2'),
    });
  }


  ngOnInit(): void {
  }

  submit() {
    console.log("hello")
  }

  equalValuePasswords(
    password: string,
    password2: string
  ) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[password];
      const password2Input = group.controls[password2];
      if (passwordInput.value !== password2Input.value) {
        return password2Input.setErrors({ notEquivalent: true });
      } else {
        return password2Input.setErrors(null);
      }
    };
  }

}


/*
import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/form-models';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  serverErrors: string;
  registerForm: FormGroup;
  model: RegisterModel;
  
  constructor(private auth: AuthService,  private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.model = {email: '', firstName: '', lastName: '', password: '' , password2: '', idNumber: ''};
    this.registerForm = this.formBuilder.group ({
      email: ['', Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(polito|studenti.polito)\.it$/)],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['', Validators.required,
        Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)],
      password2: ['', Validators.required,
          Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)],
      idNumber: ['',Validators.required],
    },{
      validator: this.checkIfMatchingPasswords('password','password2'),
    });
  }


  ngOnInit(): void {
  }

  submit() {
    console.log("hello")
  }


  checkIfMatchingPasswords(
    password: string,
    password2: string
  ) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[password];
      const password2Input = group.controls[password2];
      if (passwordInput.value !== password2Input.value) {
        return password2Input.setErrors({ notEquivalent: true });
      } else {
        return password2Input.setErrors(null);
      }
    };
  }

}


*/