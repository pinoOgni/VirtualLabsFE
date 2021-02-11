import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/form-models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  serverErrors: string;
  registerForm: FormGroup;
  model: RegisterModel;
  
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.model = {email: '', firstName: '', lastName: '', password: '' , password2: '', id: ''};
    this.registerForm = this.formBuilder.group ({
      id: ['',Validators.pattern('^(s|d)[0-9]+$')],
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
    console.log('hello')
    if (this.registerForm.valid) {
      // const model = {email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value};
       this.model.email = this.registerForm.controls.email.value;
       this.model.id = this.registerForm.controls.id.value;
       this.model.firstName = this.registerForm.controls.firstName.value;
       this.model.lastName = this.registerForm.controls.lastName.value;
       this.model.password = this.registerForm.controls.password.value;
       this.model.password2 = this.registerForm.controls.password2.value;
       this.authService.register(this.model).pipe(first()).subscribe(response => {
         if (response){
          this.dialogRef.close();
         }
       }, error => {
         if(error.status===400)
           this.serverErrors = 'Registration failed!';
         else
           this.serverErrors = 'Something went wrong!';
       });
     }
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