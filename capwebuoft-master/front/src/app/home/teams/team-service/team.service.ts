import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ITeam } from '../../interface';
import { endpoint, httpOptions } from '../../../endpoint';



@Injectable()
export class TeamService {

  // private url = './assets/testdata/teams/';
  private url = endpoint;
  private rest = '/team_finder/teams/';

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



  getTeamforUser(tid): Observable<ITeam> {//test
    return this._http.get<ITeam>(this.url + this.rest + tid + "/", this.httpOptions())
      // return this._http.get<ITeam>(this.url + this.rest)
      .do(data => console.log("team.service.ts - getTeam: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTeam(): Observable<ITeam> {
    return this._http.get<ITeam>('./assets/testdata/teams/team.json')
      // return this._http.get<ITeam>(this.url + this.rest)
      .do(data => console.log("team.service.ts - getTeam: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getTeams(): Observable<ITeam[]> {
    return this._http.get<ITeam[]>('./assets/testdata/teams/teams.json')
      .do(data => console.log("team.service.ts - getTeams: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRealTeams() {
    return this._http.get<any[]>(this.url + this.rest, this.httpOptions());
  }

  postRealTeams(tid, team_form) {
    return this._http.post(this.url + this.rest + tid, team_form, this.httpOptions());
  }

  postRealTeam(owner_pid, name, magictoken, email, cloud, areas, about) {
    var data = { "owner_pid": owner_pid, "name": name, "magictoken": magictoken, "email": email, "cloud": cloud, "related_areas": areas, "about": about };
    return this._http.post(this.url + '/team_finder/createteam/', data, this.httpOptions())
      .do(data => console.log("Post Profile", data + ""))
      .catch(this.handleError);
  }

  joinTeam(__data) {
    return this._http.post(this.url + '/team_finder/jointeam/', __data, this.httpOptions());
  }

  leaveTeam(__data) {
    return this._http.post(this.url + '/team_finder/leaveteam/', __data, this.httpOptions());
  }


  editRealTeam(team_id, name, magictoken, email, cloud, about, interested_areas) {
    var data = { "pk": team_id, "name": name, "magictoken": magictoken, "email": email, "cloud": cloud, "about": about, "interested_areas": interested_areas };
    console.log('edit team check', data);
    return this._http.post(this.url + '/team_finder/editteam/', data, this.httpOptions())
      .do(data => console.log("Edit Team Profile", data + ""))
      .catch(this.handleError);
  }

  joinProject(__data) {
    return this._http.post(this.url + '/team_finder/teamjoinproject/', __data, this.httpOptions());
  }

}
