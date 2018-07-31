import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser, IProject, ITeam } from '../../interface';
import { AuthService } from '../../../auth/service/auth.service';
import { HomeService } from '../../shared/service/home.service';

import { UserService } from '../../users/user-service/user.service';
import { TeamService } from '../../teams/team-service/team.service';
import { ProjectService } from '../../projects/project-service/project.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private fourid: any;
  private user: IUser;
  private likedp: IProject[];
  private recommandu: IUser[];
  private hasreco: boolean;
  private is_user: boolean;
  //private has_profile: boolean;
  private user_status: number;
  private team_status: number;
  UID: any;
  constructor(
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _authService: AuthService,
    private _homeService: HomeService,
    private _route: ActivatedRoute
  ) { }

  reload() {
    this.ngOnInit();
    location.reload();
  }
  ngOnInit() {
    let uid = +this._route.snapshot.paramMap.get('uid');
    console.log('yy',uid);


   /*for recommend user*/
    this._homeService.get4id().subscribe(_data => {
        this.recommandu =  new Array();

        if (_data.profile !== -1) {
          
          this._userService.getRecommendeUser(_data.user)//////
            .subscribe(_recuser => {
              if (_data.profile === uid ) { this.is_user = true; }  else {this.is_user = false;}
              // this.project.recommend_roject = new Array();
              for (let x = 0; x < _recuser.length; x++) {
                // console.log(_projects[i].related_areas[3]);
                this.recommandu.push({
                  'uid': _recuser[x].pk,
                  'name': _recuser[x].user.first_name + " " + _recuser[x].user.last_name,
                  'email': _recuser[x].user.email
                  //'status': _recuser[x].project_status,
                  //'abs': _recuser[x].project_short_description
                });
              }
              this.hasreco = true;

            });
        } else {
          this.hasreco = false;
        }
    });
   // console.log('use', this.recommandu);


    this.user_status = 0;

    this.likedp =  new Array();
    this._projectService.getUserLikedProject(uid) //////////////real user
      .subscribe(_liked => {
        for (let x = 0; x < _liked.length; x++) {
          _liked[x].created = _liked[x].created_date;
          _liked[x].pid = _liked[x].project_id;
          _liked[x].name = _liked[x].project_title;
          _liked[x].liked_number = _liked[x].liked_by_people_number;
          _liked[x].abs = _liked[x].project_short_description;
          _liked[x].status = _liked[x].project_status;
          _liked[x].owner_first_name = _liked[x].created_by.first_name;
          _liked[x].owner_last_name = _liked[x].created_by.last_name;
          //_liked[x].whatever = _liked[x].created_by.pk;
          _liked[x].owner_role = _liked[x].created_by.role;
          this.likedp.push(_liked[x]);
        }
      });

    this._userService.getProfile(uid)
      .subscribe(_data => {
        let _user: IUser = {};

        _user.first = _data.user.first_name;
        _user.last = _data.user.last_name;
        _user.email = _data.user.email;
        _user.about = _data.about;
        _user.areas = _data.related_areas;
        _user.experiences = _data.experiences;
        //_user.status = 55;
        _user.views = 321;
        if (_user.about ) {
          console.log('add 1');
          this.user_status += 25;
        }
        _user.created = new Date();
        _user.modified = new Date();
        _user.modified_str = _user.modified.toISOString().substring(0, 10);

        _user.tag ? _user.tags = _user.tag.split(" ") : null;
        if (_data.team !== null) {

          // _user.team ? null : _user.team = {};
          // _user.team.tag ? null : _user.team.tag = "WOCAO";
          // _user.team.tags ? _user.team.tags = _user.team.tag.split(" ") : _user.team.tags = [];
          _user.tid = _data.team.pk;
          this.user_status += 25;
          console.log('add 2');
          this._teamService.getTeamforUser(_user.tid)
            .subscribe(_team => {
              _user.team = _team;
              //_user.team.tags = _user.team.tag.split(" ");


              this._teamService.getTeamforUser(_user.tid)
                .subscribe(_team => {
                  //for testing  project
                  //get actual pid later
                  this._homeService.get4id() //test with team,combine to one later
                    .subscribe(_info => {
                      if (_info.user) {
                        this._projectService.getUserCreatedProject(_info.user)
                          .subscribe(_projects => {
                            _user.projects = _projects;
                            console.log('add 3');
                            this.user = _user;
                            // })
                          });
                      }
                      else {
                        _user.project = null;
                      }
                    });
                    
                  this.user = _user;
                });
            });
        }
        else {

          _user.team = null;
          this.user = _user;

        }

        this.user.uid = uid;
        console.log('user staus', this.user_status);



      });


  }
}
