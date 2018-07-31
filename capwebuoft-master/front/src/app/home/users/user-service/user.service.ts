import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IUser } from '../../interface';
import { endpoint } from '../../../endpoint';

@Injectable()
export class UserService {

  //private url = './assets/testdata/users/';
  // private url = 'http://192.168.0.14:8000';
  private url = endpoint;
  private rest = '/team_finder/';

  constructor(private _http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      // params: _params,
      withCredentials: true
    }
  }

  getRealUser(uid) {
    //return this._http.get('./assets/testdata/users/user.json')
    return this._http.get(this.url + this.rest + 'users/' + uid + '/', this.httpOptions())
      .do(data => console.log("GETUSER", data))
      .catch(this.handleError);
  }

  getUser(uid) {
    return this._http.get('./assets/testdata/users/user.json')
      //return this._http.get(this.url + this.rest + 'users/' + uid + '/', this.httpOptions())
      .do(data => console.log("GETUSER", data))
      .catch(this.handleError);
  }

  getUsers() {
    return this._http.get('./assets/testdata/users/users.json')
      //return this._http.get(this.url + this.rest + 'users/', this.httpOptions())
      .do(data => console.log("ALL USER", data))
      .catch(this.handleError);
  }

  getRealUsers() {
    //return this._http.get('./assets/testdata/users/users.json')
    return this._http.get(this.url + this.rest + 'users/', this.httpOptions())
      .do(data => console.log("ALL USER", data))
      .catch(this.handleError);
  }

  postUser(_user) {
    return this._http.post(this.url, _user, this.httpOptions())
      .do(data => console.log("PostUser: ", data))
      .catch(this.handleError);
  }


  getRecommendeUser(uid): Observable<any> {
    //var data = {"user_id": uid};
    var url = 'http://api.ece496.com/team_finder/team_algo?user_id=' + uid;
    //console.log('url-----------------', url);
    //console.log('url-----------------', this.url3+pid);
    return this._http.get<any>(url, this.httpOptions())
      .do(data => console.log("reco user ", JSON.stringify(data)))
      .catch(this.handleError);
  }

getProfile(uid) {
    return this._http.get(this.url + this.rest + 'profiles/' + uid + '/', this.httpOptions())
      .do(data => console.log("GETPROFILE", data))
      .catch(this.handleError);
  }

  getProfiles() {
    // return this._http.get('./assets/testdata/users/users.json')
    return this._http.get(this.url + this.rest + 'profiles/', this.httpOptions())
      .do(data => console.log("ALL USER", data))
      .catch(this.handleError);
  }

  postRealProfile(user_id, about, related_areas, experience) {
    var data = {"user_id":user_id,"about":about,"related_areas":related_areas,"experience":experience};
    return this._http.post(this.url + this.rest + 'createprofile/',data, this.httpOptions())
      .do(data => console.log("Post Profile", data + ""))
      .catch(this.handleError);
  }

  editRealProfile(user_profile_id, about, related_areas, experience) {
    var data = {"user_profile_id":user_profile_id,"about": about,"related_areas":related_areas,"experience":experience};
    //console.log("check edit",JSON.stringify(data));
    return this._http.post(this.url + this.rest + 'editprofile/', data, this.httpOptions())
      .do(data => console.log("Edit Profile", data + ""))
      .catch(this.handleError);
  }
}
