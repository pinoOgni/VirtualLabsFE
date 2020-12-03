import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../model';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../auth.service";
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
  
  constructor(private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.model = {email: '', firstName: '', lastName: '', password: '' , password2: '', serialNumber: ''};
    this.registerForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(polito|studenti.polito)\.it$/)]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required,
        Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)]),
      password2: new FormControl('', [Validators.required,
          Validators.pattern(/^((?=.*[0-9])|(?=.*[@#$%^&+!=]))((?=.*[a-z])|(?=.*[A-Z]))(?=\S+$).{8,}$/)]),
      serialNumber: new FormControl('',[Validators.required])
    });
  }


  ngOnInit(): void {
  }

  submit() {
    console.log("hello")
  }

}
