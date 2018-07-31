import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { endpoint } from '../../endpoint';


@Injectable()
export class AuthService {
  private url = endpoint;
  private rest = "/auth";
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    }
  }

  authed() {
    // ping server with token
    console.log('checking token');
    return this._http.get(this.url + "/team_finder/getlogin", this.httpOptions())    
  }

  login(credentials) {
    return this._http.post(this.url + this.rest +  "/login/", credentials, this.httpOptions());
  }

  logout() {
    return this._http.get(this.url + this.rest + "/logout/", this.httpOptions());
  }

  register(regform) {
    return this._http.post(this.url + this.rest + "/register/", regform, this.httpOptions())
  }

}
