import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IUser, ITeam, IProject } from '../interface';

import { UserService } from '../users/user-service/user.service';
import { TeamService } from '../teams/team-service/team.service';
import { ProjectService } from '../projects/project-service/project.service';

@Injectable()
export class SearchService {

  private data: any[];

  private users: IUser[];
  private teams: ITeam[];
  private projects: IProject[];


  constructor(
    private _http: HttpClient,
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService
  ) { }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

  getData() {
    this._userService.getUsers()
      .subscribe(_users => {
        for (let i = 0; i < _users.length; i++) {
          _users[i].created = new Date();
          _users[i].modified = new Date();
          _users[i].modified_str = _users[i].modified.toISOString().substring(0, 10);

          _users[i].tag ? _users[i].tags = _users[i].tag.split(" ") : null;
          //_users[i].team.tag ? _users[i].team.tags = _users[i].team.tag.split(" ") : null;

          _users[i].s_name = _users[i].name;
          _users[i].s_str = _users[i].uid + " " + _users[i].utorid + " " + _users[i].name + " " + _users[i].email + " " + _users[i].tag;
        }
        this.users = _users;

        this._teamService.getTeams()
          .subscribe(_teams => {
            for (let i = 0; i < _teams.length; i++) {
              _teams[i].created = new Date();
              _teams[i].modified = new Date();
              _teams[i].modified_str = _teams[i].modified.toISOString().substring(0, 10);

              _teams[i].tag ? _teams[i].tags = _teams[i].tag.split(" ") : null;

              _teams[i].s_name = _teams[i].name;
              _teams[i].s_str = _teams[i].tid + " " + _teams[i].oid + " " + _teams[i].owner + " " + _teams[i].email + " " + _teams[i].tag;
            }
            this.teams = _teams;

            this._projectService.getProjects()
              .subscribe(_projects => {
                for (let i = 0; i < _projects.length; i++) {
                  _projects[i].created = new Date();
                  _projects[i].modified = new Date();
                  _projects[i].modified_str = _projects[i].modified.toISOString().substring(0, 10);

                  _projects[i].tag ? _projects[i].tags = _projects[i].tag.split(" ") : null;

                  _projects[i].s_name = _projects[i].name;
                  _projects[i].s_str = _projects[i].pid + " " + _projects[i].oid + " " + _projects[i].owner + " " + _projects[i].email + " " + _projects[i].tag;

                }
                this.projects = _projects;

                this.data = [];
                this.data = this.data.concat(this.users, this.teams, this.projects);

                return this.data;
              });
          });
      });
  }

}
