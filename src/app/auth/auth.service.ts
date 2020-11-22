import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "./model";
import {tap} from "rxjs/operators";
// @ts-ignore
import * as moment from 'moment';
// @ts-ignore
import * as jwt_decode from 'jwt-decode';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  base_URL = environment.base_URL;
  constructor(private httpClient: HttpClient) { }


  logout() {
    localStorage.removeItem('token_id');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('to_url');
  }

  login(model: LoginModel) {
    //usare shareplay?
    return this.httpClient.post(this.base_URL + 'login',model).pipe(tap(res => this.setUserSession(res)));
  }

  private setUserSession(authResult) {
    const expiresAt = moment((JSON.parse(atob(authResult.accessToken.split('.')[1])).exp)*1000);

    localStorage.setItem('token_id', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('email',JSON.parse(atob(authResult.accessToken.split('.')[1])).email);
    }

  public isUserLogged(): boolean {
    return moment().isBefore(this.getExpirationToken());
  }

  getExpirationToken() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
