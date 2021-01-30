import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
      private auth: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  }

  ngOnInit(): void {
  }

  confirmDelete() {
    console.log('popipopi');
    this.dialogRef.close(
        {
          confirmed: true
        }
    );
  }
}
