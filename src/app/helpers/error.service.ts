import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }
  
  handleError<T>(error: any, result?: T) {
    console.log('handle error');
    this.snackBar.open((error as HttpErrorResponse).error.message + ' ⚠️', '', { 
      duration: 5000,
      panelClass: ['alert-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
  });
  // Let the app keep running by returning an empty result.
  return of(result as T);
}

}
