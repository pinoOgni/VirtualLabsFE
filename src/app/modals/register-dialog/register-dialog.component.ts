import { Component } from '@angular/core';
import { RegisterModel } from '../../models/form-models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { InputFile } from 'src/app/models/input-file.model';


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {

  serverErrors: string;
  registerForm: FormGroup;
  
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.registerForm = this.formBuilder.group ({
      avatar: '',
      id: ['',Validators.pattern('^(s|d)[0-9]+$')],
      email: ['', Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(polito|studenti.polito)\.it$/)],
      firstName: ['',Validators.pattern('^[A-Za-z]{2,20}$')],
      lastName: ['',Validators.pattern('^[A-Za-z]{2,20}$')],
      password: ['', Validators.required],
      //password: ['', Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)],
      password2: [''],
    },
    {
      validator: this.equalValuePasswords('password', 'password2'),
    });
  }




  submit() {
    if(this.registerForm.invalid) {
      return;
    }
    const registerFormData = new FormData();
    registerFormData.append('email',this.registerForm.get('email').value)
    registerFormData.append('id',this.registerForm.get('id').value)
    registerFormData.append('firstName',this.registerForm.get('firstName').value)
    registerFormData.append('lastName',this.registerForm.get('lastName').value)
    registerFormData.append('password',this.registerForm.get('password').value)
    const fileInput: InputFile = this.registerForm.get('avatar').value ? this.registerForm.get('avatar').value : null;
    if(fileInput) {
      registerFormData.append('avatar',fileInput.files[0]);
    } else {
      registerFormData.append('avatar'," ");
    }
      
    this.authService.register(registerFormData).pipe(first()).subscribe(response => {
         if (response){
          this.dialogRef.close();
         }
       }, error => {
         if(error.status===400) {
           this.serverErrors = error.message;
         }
       });
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