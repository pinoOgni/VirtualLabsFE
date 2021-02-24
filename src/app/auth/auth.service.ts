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
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/form-models';
import { catchError, map, tap } from 'rxjs/operators';
// @ts-ignore
import * as moment from 'moment';
// @ts-ignore
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ErrorService } from '../helpers/error.service';

@Injectable({
  providedIn: 'root'
})

/**
 * RxJS Subjects and Observables are used to store the current
 * user object and notify other components when the user logs in
 * and out of the app
 */
export class AuthService {

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
  constructor(private errorService: ErrorService, private httpClient: HttpClient) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && moment().isBefore(User.getAccessTokenExpireTime(user.token))) {
      localStorage.removeItem('currentUser');
      user = null;
    }
    this.currentUserSubject = new BehaviorSubject<User>(user);
  }

  /**
   * The logout() method removes the current user object 
   * from local storage and put null to the currentUserSubject 
   * to notify all subscribers that the user has logged out.
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * The login() method sends the user credentials to the API via an 
   * HTTP POST request for authentication. 
   * If successful the user object including a JWT auth token are
   * stored in localStorage to keep the user logged in between page 
   * refreshes. The user object is then published to all subscribers 
   * with the call to this.currentUserSubject.next(user);.
   * @param model 
   */
  login(model: LoginModel) {
    return this.httpClient.post<User>(environment.login_url, model, environment.http_options)
      .pipe(
        tap((authResult) => {
          // jwt response, I'm logged; jwt is a json with a key 'token' asfajscbiasoc.acnasicansocas.coacoasbnsoc
          const user = new User(
            JSON.parse(atob(authResult.token.split('.')[1])).sub, //user
            authResult.token, //token sano
            JSON.parse(atob(authResult.token.split('.')[1])).roles //ROLE_ADMIN
          );
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError((err,caught) =>  this.errorService.handleError<any>(err,caught))
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

  /**
   * This method is used to register a user, post to the server and send a FormData
   * @param registerForm 
   */
  register(registerForm: FormData) {
    return this.httpClient.post(environment.register_url, registerForm).pipe(
      tap((result) => {
        console.log('result register ', result)
      }),
      catchError((err,caught) =>  this.errorService.handleError<any>(err,caught))
    );
  }

  /**
   * This function is used to return the currentUser ad an observable
   * using the currentUserSubject which is a BehaviorSubject 
   * (super sayan of Subject that store the current value and emits
   * it to any new subscribers as soon as is possible)
   */
  public getCurrentUserserObservable(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * This method is used to check if a user is logged in
   */
  public isUserLogged(): boolean {
    return moment().isBefore(this.getExpirationToken());
  }

  /**
   * This method is used to check if the user's token is still valid
   */
  getExpirationToken() {
    const expiration = JSON.parse(localStorage.getItem('currentUser')).accessToken;
    const expiresAt = JSON.parse(expiration);
    console.log('getExpirationToken ', expiration)
    return moment(expiresAt);
  }
}
