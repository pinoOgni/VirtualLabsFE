/**
 * NOTE: If you don't like the idea of storing the current user 
 * details in local storage, all you need to do is change the 3 
 * references to localStorage in this file. Other options are session 
 * storage, cookies, or you could simply not store the user details 
 * in the browser, although be aware that with this last option that 
 * the user will be automatically logged out if they refresh the page.
 * 
 */

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginModel, RegisterModel} from "../models/form-models";
import {tap,map} from "rxjs/operators";
// @ts-ignore
import * as moment from 'moment';
// @ts-ignore
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject,Observable} from "rxjs";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

/**
 * RxJS Subjects and Observables are used to store the current 
 * user object and notify other components when the user logs in 
 * and out of the app
 */
export class AuthService{

  base_URL = environment.base_URL;


  /**
   * Angular components can subscribe() to the public currentUser: 
   * Observable property to be notified of changes, and notifications 
   * are sent when the this.currentUserSubject.next() 
   * method is called in the login() and logout() methods, 
   * passing the argument to each subscriber
   */
  public currentUser: Observable<User>;
  /**
   * The RxJS BehaviorSubject is a special type of Subject that 
   * keeps hold of the current value and emits it to any new 
   * subscribers as soon as they subscribe, while regular 
   * Subjects don't store the current value and only emit 
   * values that are published after a subscription is created
   */
  private currentUserSubject: BehaviorSubject<User>;
  

  /**
   * The constructor() of the service initialises the 
   * currentUserSubject with the currentUser object from 
   * localStorage which enables the user to stay logged 
   * in between page refreshes or after the browser is closed. 
   * The public currentUser property is then set to 
   * this.currentUserSubject.asObservable(); which allows other 
   * components to subscribe to the currentUser 
   * Observable but doesn't allow them to publish to the 
   * currentUserSubject, this is so logging in and out of the app 
   * can only be done via the authentication service.
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && moment().isBefore(User.getToken_idExpireTime(user.token_id))) {
      localStorage.removeItem('currentUser');
      user = null;
    }
    this.currentUserSubject = new BehaviorSubject<User>(user);
  }

  /**
   * The logout() method removes the current user object 
   * from local storage and publishes null to the currentUserSubject 
   * to notify all subscribers that the user has logged out.
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * The login() method sends the user credentials to the API via an 
   * HTTP POST request for authentication. 
   * If successful the user object including a JWT auth token are
   *  stored in localStorage to keep the user logged in between page 
   * refreshes. The user object is then published to all subscribers 
   * with the call to this.currentUserSubject.next(user);.
   * @param model 
   */
  login(model: LoginModel) {
    return this.httpClient.post<any>(environment.login_url,model)
    .pipe(
      map((authResult) => {
       const user = new User(
          model.email,
          authResult.accessToken,
          //this.jwtParser(authResult.accessToken).roles
          ["ROLE_ADMIN"]
        );
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return authResult;
      })
    );
}
  /**
   * The currentUserValue getter allows other components 
   * an easy way to get the value of the currently logged 
   * in user without having to subscribe to the currentUser 
   * Observable.
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(model: RegisterModel) {
    return this.httpClient.post(environment.register_url, model).pipe();
  }
  /**
   * This function is used to return the currentUser ad an observable
   */
  public getCurrentUserserObservable(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }


  jwtParser(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => { return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2); })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public isUserLogged(): boolean {
    return moment().isBefore(this.getExpirationToken());
  }

  getExpirationToken() {
    const expiration = JSON.parse(localStorage.getItem('currentUser')).token_id;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
