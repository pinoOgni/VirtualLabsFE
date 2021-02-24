import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }
  /*
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
        }
         return throwError(err);
      }))
    }
    */

  /**
   * This method (as the name implies) is placed between the client and the server, intercepting requests.
   * @param request 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log('error status', err.status);
      const currentUser = this.authService.currentUserValue;
      if (currentUser && err.status === 401) {
        this.authService.logout();
        this.router.navigate(['/'], { queryParams: { returnedUrl: location.pathname, doLogin: true } });
      } else if (err.status === 403) {
        this.router.navigate(['/'], { queryParams: { returnedUrl: location.pathname, doLogin: true } });
      }
      return throwError(err);
    }));
  }






}
