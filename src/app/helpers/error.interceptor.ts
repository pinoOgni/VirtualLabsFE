import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {catchError} from 'rxjs/operators';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastrService: ToastrService, private router: Router) {}
/*
//TODO miglioare nel progetto
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

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor error')
    return next.handle(request).pipe(catchError(err => {
      console.log('error status', err.status)
      const currentUser = this.authService.currentUserValue;
      if (currentUser && err.status === 401) {
        if (moment().isBefore(User.getAccessTokenExpireTime(currentUser.token))) {
          this.toastrService.info(`Token expired. Login again`);
        } else {
          this.toastrService.info(`Permission denied`);
        }
        this.authService.logout();
        this.router.navigate(['/'], {queryParams: {returnUrl: location.pathname, doLogin: true}});
      } else if(err.status === 403) {
        this.toastrService.info(`Error login`);
        this.router.navigate(['/'], {queryParams: {returnUrl: location.pathname, doLogin: true}});
      }
      return throwError(err);
    }));
  }
}
