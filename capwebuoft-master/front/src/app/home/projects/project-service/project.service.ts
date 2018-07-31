import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IProject, IAreas, IOption, IPArea } from '../../interface';

@Injectable()
export class ProjectService {

  private proj: IProject[];
  private data: Observable<any[]>;
  private url = 'http://api.ece496.com/project_finder/project_detail?project_id=';
  private url2 = 'http://api.ece496.com/project_finder/liked_project?user_id=';
  private url3 = 'http://api.ece496.com/project_finder/project_recommendation?project_id=';
  private url4 = 'http://api.ece496.com/project_finder/user_created_project?user_id=';
  private url5 = 'http://api.ece496.com/project_finder/user_supervised_project?user_id=';


  constructor(private _http: HttpClient) {
  }

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
    };
  }


  getProject(pid): Observable<any> {
    return this._http.get<any>(this.url + pid, this.httpOptions())
      .do(data => console.log("project.service.ts - getProject: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProfileID(uid): Observable<any> {
    return this._http.get<any>('http://api.ece496.com/team_finder/getprofileid/' + uid, this.httpOptions())
      .catch(this.handleError);
  }

  getRecommendedProject(pid, uid): Observable<any> {
    var url = this.url3 + pid + '&user_id=' + uid;
    return this._http.get<any>(url, this.httpOptions())
      .do(data => console.log("project.service.ts - getRecommendedProject: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUserLikedProject(uid): Observable<any> {
    return this._http.get<any>(this.url2 + uid, this.httpOptions())
      .do(data => console.log("project.service.ts - getLikedProject: ", JSON.stringify(data)))
      .catch(this.handleError);

    // for search component
    // project.s_name = project.name;
    // project.s_str = project.pid + " " + project.oid + " " + project.name + " " + project.owner + " " + project.email + " " + project.tag
  }

  getUserCreatedProject(uid): Observable<any> {
    return this._http.get<any>(this.url4 + uid, this.httpOptions())
      .do(data => console.log("project.service.ts - getCreatedProject: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUserSupervisedProject(uid): Observable<any> {
    return this._http.get<any>(this.url5 + uid, this.httpOptions())
      .do(data => console.log("project.service.ts - getSupervisedProject: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProjects(): Observable<any[]> {
    return this._http.get<any[]>('http://api.ece496.com/project_finder/projects', this.httpOptions()/*'./assets/testdata/projects/projects.json'*/)
      .do(data => JSON.stringify(data))
      .catch(this.handleError);
  }

  getArea(): Observable<IPArea[]> {
    return this._http.get<IPArea[]>('http://api.ece496.com/project_finder/all_tags', this.httpOptions())
      .do(data => console.log("project.service.ts - getArea: ", JSON.stringify(data)))
      .catch(this.handleError);
  }

  getOpenProject(): Observable<any> {
    return this._http.get<IPArea[]>('http://api.ece496.com/project_finder/avaliable_project_number', this.httpOptions())
      .do(data => console.log("project.service.ts - getArea: ", JSON.stringify(data)))
      .catch(this.handleError);
  }


  postComment(_pid, _uid, _comment) {
    var data = {"project_id": _pid, "user_id": _uid, "content": _comment, "reply_to_root": true};
    console.log(data);
    return this._http.post('http://api.ece496.com/project_finder/add_comment', data, this.httpOptions())
      .do(data => console.log("postComment: ", data))
      .catch(this.handleError);
  }

  postAddLiked(_pid, _uid) {
    var data = {"project_id": _pid, "user_id": _uid};
    return this._http.post('http://api.ece496.com/project_finder/add_like_project', data, this.httpOptions())
      .do(data => console.log("postAddLiked: ", data))
      .catch(this.handleError);
  }

  postRemoveLiked(_pid, _uid) {
    var data = {"project_id": _pid, "user_id": _uid};
    return this._http.post('http://api.ece496.com/project_finder/remove_like_project', data, this.httpOptions())
      .do(data => console.log("postRemoveLiked: ", data))
      .catch(this.handleError);
  }

  postCreateProject(uid, name, abs, about, checkedarea, checkedsize){
    var data = {"created_user_id": uid, "project_title": name, "project_short_description": abs, "project_detailed_description": about, "related_areas": checkedarea, "number_of_members_accepted": checkedsize};
    console.log(data);
    return this._http.post('http://api.ece496.com/project_finder/add_project', data, this.httpOptions())
      .do(data => console.log("postCreateProject: ", data))
      .catch(this.handleError);
  }

  postEditProject(uid, pid, name, status, abs, about, checkedarea, checkedsize){
    var data = {"user_id": uid, "project_id": pid, "project_title": name, "project_status": status, "project_short_description": abs, "project_detailed_description": about, "related_areas": checkedarea, "number_of_members_accepted": checkedsize};
    console.log(data);
    return this._http.post('http://api.ece496.com/project_finder/edit_project', data, this.httpOptions())
      .do(data => console.log("postEditProject: ", data))
      .catch(this.handleError);
  }

  postClaimProject(uid, pid){
    var data = {"user_id": uid, "project_id": pid};
    console.log(data);
    return this._http.post('http://api.ece496.com/project_finder/claim_project', data, this.httpOptions())
      .do(data => console.log("postClaimProject: ", data))
      .catch(this.handleError);
  }

}
