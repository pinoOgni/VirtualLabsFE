import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../../models/form-models';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  model: LoginModel;
  serverErrors: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.model = {username: '', password: ''};
    this.loginForm = this.formBuilder.group ({
      // username: ['', Validators.required],
      password: ['', Validators.required],
    
     email: ['', Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(polito|studenti.polito)\.it$/)],
     // password: ['', Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)],
    });
  }

  ngOnInit() {
  }

  close(isLogged: boolean) {
    this.dialogRef.close(isLogged);
  }

  submit() {
    if (this.loginForm.valid) {
     // const model = {username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value};
     //splitto la mail e mando solo lo username
      this.model.username = this.loginForm.controls.email.value.split('@')[0];
      this.model.password = this.loginForm.controls.password.value;
      console.log('submit login this.model.username ', this.model.username)
      console.log('submit login this.loginForm.controls.username ', this.loginForm.controls.email.value)
      this.authService.login(this.model).pipe(first()).subscribe(response => {
        if (response){
            this.close(true);
        }
      }, error => {
        //TODO 
        if(error.status===400)
          this.serverErrors = 'Authentication failed!';
        else
          this.serverErrors = 'Something went wrong!';
      });
    }
  }

}
