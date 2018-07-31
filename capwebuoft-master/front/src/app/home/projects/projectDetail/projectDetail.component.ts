import { Component, OnInit } from '@angular/core';

import { UserService } from '../../users/user-service/user.service';
import { TeamService } from '../../teams/team-service/team.service';
import { ProjectService } from '../project-service/project.service';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../shared/service/home.service';
import { Router } from '@angular/router';

import { IProject, IUser, ITeam, Likepeople } from '../../interface';


declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-projectDetail',
  templateUrl: './projectDetail.component.html',
  styleUrls: ['./projectDetail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  currentuid;
  add_teamid = "";
  private has_profile = false;
  private match_pid = false;
  private hasreco: boolean;
  private project: IProject;
  private user: IUser;
  private expanded: boolean;
  private isSup: boolean;
  private first: boolean;
  private greater: number;
  private likedp: any;
  private like_or_not: boolean;
  private last_liked: Likepeople;
  private new_com: string;
  private has_sup: boolean;
  constructor(private _route: ActivatedRoute,
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _homeService: HomeService,
    private _router: Router) {
  }

  ngOnInit() {
    this.has_sup = true;
    this.expanded = false;
    this.like_or_not = false;
    this.isSup = false;
    this.first = true;
    this.hasreco = false;
    this.getData();
  }



  like(like_or_not, uid, pid) {

    this._homeService.get4id().subscribe(_ids => {
      if (isNaN(_ids.profile) || _ids.profile < 1) {
        swal({
          title: "You need to create a profile first!",
          text: "Then you can like projects and save it to your profile!",
          type: "info"
        });
        // alert("Invalid User ID");
        this._router.navigate(['/users/create']);
        return false;
      }
    });



    if (like_or_not) {
      this._projectService.postAddLiked(pid, uid)
        .subscribe(result => {
          console.log(result);
        });
    }
    else {
      this._projectService.postRemoveLiked(pid, uid)
        .subscribe(result => {
          console.log(result);
        });
    }

    this.getData();
  }

  add_new_team() {
    let new_team = {
      team_id: this.add_teamid,
      project_id: this.project.pid
    }
    this._teamService.joinProject(new_team).subscribe(__data => {
      swal({
        title: "Good job!",
        text: "The team has been added into your project!",
        type: "success"
      });

    }, __err => {
      swal({
        title: "No!",
        text: "Something Wrong!",
        type: "error"
      });
    })
  }

  newcomment(uid, pid) {
    this.new_com = $('#new_comment').val();
    console.log('new comment:', $('#new_comment').val(), '.', 'uid:', uid, 'pid:', pid);
    this._projectService.postComment(pid, uid, $('#new_comment').val())
      .subscribe(result => {
        console.log(result);
      });
    this.getData();
    $('#new_comment').val("");
    //location.reload();
  }

  reload() {
    location.reload();
  }

  claimProject(uid, pid) {

    this._homeService.get4id().subscribe(_ids => {
      if (isNaN(_ids.profile) || _ids.profile < 1) {
        swal({
          title: "You need to create a profile first!",
          text: "Then you can be the supervisor of the project and save it to your profile!",
          type: "info"
        });
        // alert("Invalid User ID");
        this._router.navigate(['/users/create']);
        return false;
      }
    });

    console.log('uid:', uid, 'pid:', pid);
    this._projectService.postClaimProject(uid, pid)
      .subscribe(result => {
        console.log(result);
      });
    this.getData();
    //this.reload();

  }

  getData() {



    this._homeService.get4id().subscribe(_data => {
      this.currentuid = _data;
      this.currentuid = this.currentuid.user;
      if (_data.profile > 0) {
        this.has_profile = true;
      }

      if (this.currentuid) {
        this._userService.getRealUser(this.currentuid) /*RealUser*/
          .subscribe(_users => {
            _users.first = _users.first;
            _users.last = _users.last;
            _users.role = _users.groups;
            _users.uid = this.currentuid;




            if (_data.team !== -1) {
              _users.has_team = true;
            } else {
              _users.has_team = false;
            }


            if (_users.role[0] === 1) {
              _users.role = 'Supervisor';
            }
            if (_users.role[0] === 2) {
              _users.role = 'Student';
            }
            this.user = _users;
            const pid = +this._route.snapshot.paramMap.get('pid');
            this._projectService.getProject(pid)
              .subscribe(_project => {
                _project.created = _project.created_date;
                _project.pid = _project.project_id;
                _project.owner_first_name = _project.created_by.first_name;
                _project.owner_last_name = _project.created_by.last_name;
                _project.ownerid = _project.created_by.pk;
                _project.owner_role = _project.created_by.role;
                if (_project.ownerid == _data.user) {
                  this.match_pid = true;
                }
                this._projectService.getProfileID(_project.created_by.pk)
                  .subscribe(_o => {
                    _project.ownerid = _o.profile_id;
                  });



                if (_project.owner_role === 'Supervisor' || _project.owner_role === 'supervisor') {
                  this.isSup = true;
                }
                if (this.isSup == true) {
                  _project.owner_role = 'Professor';
                }

                this._userService.getUser(this.currentuid)
                  .subscribe(_user => {
                    _project.oid = this.currentuid; /////////////// make this equal to _user.uid;

                    if (this.first) {
                      this.first = false;
                      this._projectService.getUserLikedProject(this.currentuid)
                        .subscribe(_liked => {
                          let p = new Array();
                          for (let x = 0; x < _liked.length; x++) {
                            p.push(_liked[x].project_id);
                          }
                          for (let x = 0; x < p.length; x++) {
                            if (p[x] === _project.pid) {
                              this.like_or_not = true;
                            }
                          }
                        });
                    }



                    _project.name = _project.project_title;
                    _project.liked_number = _project.liked_by_people_number;
                    _project.about = _project.project_detailed_description;
                    _project.tags = _project.related_areas;

                    _project.areas = new Array();
                    for (let x = 0; x < _project.related_areas.length; x++) {
                      _project.areas.push({ 'tag_name': _project.related_areas[x], 'value': true });
                    }
                    _project.status = _project.project_status;
                    _project.number_of_members = _project.number_of_members_accepted;
                    _project.comments = _project.comments;
                    _project.team_member_name = " ";
                    if (_project.members != null) {
                      _project.team_member_number = _project.members.length;
                      for (let x = 0; x < _project.members.length; x++) {
                        _project.team_member_name += _project.members[x].first_name + " " + _project.members[x].last_name;
                        if (x !== (_project.members.length - 1)) {
                          _project.team_member_name += ", ";
                        }
                      }
                    }
                    else {
                      _project.team_member_number = 0;
                      _project.team_member_name = null;
                    }


                    if (_project.liked_by_people_number > 2) {
                      this.greater = _project.liked_by_people_number - 2;
                    }
                    else {
                      this.greater = _project.liked_by_people_number;
                    }


                    _project.liked_people_name = new Array();
                    for (let x = 0; x < _project.liked_by_people_number - 1; x++) {
                      this._projectService.getProfileID(_project.liked_by_people[x].pk)
                        .subscribe(_l => {
                          _project.liked_by_people[x].pk = _l.profile_id;
                        });
                      _project.liked_people_name.push({
                        'name': _project.liked_by_people[x].first_name + " " + _project.liked_by_people[x].last_name,
                        'uid': _project.liked_by_people[x].pk
                      });
                    }

                    if (_project.liked_by_people_number != 0) {
                      this.last_liked = {
                        'name': _project.liked_by_people[_project.liked_by_people_number - 1].first_name + " " + _project.liked_by_people[_project.liked_by_people_number - 1].last_name,
                        'uid': _project.liked_by_people[_project.liked_by_people_number - 1].pk
                      };
                      _project.liked_people_str = " ";
                    }



                    if (_project.supervisor) {
                      this.has_sup = true;
                      _project.sid = _project.supervisor.pk;


                      this._projectService.getProfileID(_project.sid)
                        .subscribe(_s => {
                          _project.sid = _s.profile_id;

                        });

                      if (_project.owner_first_name === _project.supervisor.first_name && _project.owner_last_name === _project.supervisor.last_name) {
                        _project.owner_role = 'Professor';
                      }

                      _project.supervisor = _project.supervisor.first_name + " " + _project.supervisor.last_name;
                    } else {
                      this.has_sup = false;
                    }

                    this._projectService.getUserLikedProject(this.currentuid)
                      .subscribe(_liked => {
                        if (_liked.length !== 0) {
                          this.likedp = true;
                        } else {
                          this.likedp = false;
                        }
                      });

                    _project.comments = _project.comments;
                    _project.s_str = _project.pid + " " + " " + _project.name + " " + _project.owner + " " + _project.status + " " + _project.tag + _project.abs;

                    this.project = _project;
                    if (_data.profile !== -1) {
                      this.hasreco = true;
                      this._projectService.getRecommendedProject(pid, _data.profile)/////////////// make this equal to profileid;
                        .subscribe(_recproject => {

                          this.project.recommend_roject = new Array();
                          for (let x = 0; x < _recproject.length; x++) {
                            this.project.recommend_roject.push({
                              'pid': _recproject[x].project_id,
                              'name': _recproject[x].project_title,
                              'status': _recproject[x].project_status,
                              'abs': _recproject[x].project_short_description
                            });
                          }

                        });
                    } else {
                      this.hasreco = null;
                    }

                  });
              });
          });
      }
    }, err => {
      $({
        title: "Not Logined",
        text: "Please Login",
        type: "error"
      });
      this._router.navigate(['/login']);
    });
  }

}

