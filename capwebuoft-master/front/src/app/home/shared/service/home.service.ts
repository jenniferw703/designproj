import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { wocaoid } from '../../interface';
import { endpoint } from '../../../endpoint';


@Injectable()
export class HomeService {

  //private url = './assets/testdata/users/';
  // private url = 'http://192.168.0.14:8000';
  private url = endpoint;

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

  get4id(): Observable<wocaoid> {
    // return {
    //   "first": "Owen",
    //   "last": "Chan",
    //   "uid": 123456,
    //   "tid": 734,
    //   "pid": 2017505,
    // }
    return this._http.get(this.url + '/team_finder/getlogin', this.httpOptions())
  }

  getTimeline() {
    return this._http.get(this.url + '/team_finder/timeline/?&sort={created}', this.httpOptions())
  }

  postTimeline(__data) {
    return this._http.post(this.url + '/team_finder/addtimeline', __data, this.httpOptions())
  }

  // likeHelper(type, source_id, target_id) {
  //   let _payload = {
  //     'type': type,
  //     'source_id': source_id,
  //     'target_id': target_id
  //   }
  //   return this._http.post(this.url, _payload, this.httpOptions())
  // }

  // viewHelper(source_id, target_id) {
  //   let _payload = {
  //     'source_id': source_id,
  //     'target_id': target_id
  //   }
  //   return this._http.post(this.url, _payload, this.httpOptions())
  // }

  // getTimeline() {
  //   return this._http.get(this.url, this.httpOptions())
  // }

  // postTimeline(_payload) {
  //   return this._http.post(this.url, _payload, this.httpOptions())
  // }


}
