import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { SpinnerService } from '../services/spinner.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      request = request.clone({
        headers: request.headers.set('Authorization',
          'Bearer ' + currentUser.token)
      });
    }
    //     return next.handle(request);

    return next
    .handle(request)
    .pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinnerService.hide();
            }
        }, (error) => {
            this.spinnerService.hide();
        })
    );
  }
}
