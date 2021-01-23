import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from "../../environments/environment";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const currentUser = this.authService.currentUserValue;
   // console.log("800A 1 "); pino scriviti suca in culo
    if (currentUser) {
    //  console.log("800A 1.1 ", currentUser.roles[0]); pino scriviti suca in culo
      request = request.clone({
        headers: request.headers.set('Authorization',
          'Bearer ' + currentUser.token_id)
      });
    }

    return next.handle(request);
  }
}
