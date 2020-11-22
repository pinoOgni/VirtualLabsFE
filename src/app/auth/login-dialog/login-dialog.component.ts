import { Component, OnInit } from '@angular/core';
import {LoginModel} from "../model";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  serverErrors: string;
  loginForm: FormGroup;
  model: LoginModel;

  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.model = {email: '', password: ''};
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,
        Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)])
    });
  }

  ngOnInit() {
  }

  close(isLogged: boolean) {
    this.dialogRef.close(isLogged);
  }

  submit() {
    if (this.loginForm.valid) {
     // const model = {email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value};
      this.model.email = this.loginForm.controls.email.value;
      this.model.password = this.loginForm.controls.password.value;
      this.auth.login(this.model).subscribe(response => {
        let route = localStorage.getItem('to_url');
        if(route)
          localStorage.removeItem('to_url');
        else
          route = "teacher/course/applicazioni-internet/students";
        this.router.navigate([route]);
        this.close(true);
      },  error => {
        //TODO migliorare nel progetto, spostare nell'error interceptor
        if(error.status===400)
          this.serverErrors = "Authentication failed!";
        else
          this.serverErrors = "Something went wrong!";
      });
    }
  }

}
