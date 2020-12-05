import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenId = localStorage.getItem('token_id');
    if (tokenId) {
      request = request.clone({
        headers: request.headers.set('Authorization',
          'Bearer ' + tokenId)
      });
    }
    return next.handle(request);
  }
}
