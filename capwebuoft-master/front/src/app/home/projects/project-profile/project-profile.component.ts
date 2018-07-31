import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../shared/service/home.service';

import { UserService } from '../../users/user-service/user.service';
import { TeamService } from '../../teams/team-service/team.service';
import { ProjectService } from '../project-service/project.service';

import { IProject, IUser } from '../../interface';
import { Router } from '@angular/router';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {
  private currentuid;
  private user:  IUser;
  private liked_count: number;
  private createdp: IProject[];
  private likedp: IProject[];
  private supervisedp: IProject[];

  private role: string;
  constructor(
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService,

    private _route: ActivatedRoute,
    private _homeService: HomeService,
    private _router: Router
  ) { }
  reload() {
    location.reload();
  }
  ngOnInit() {
    this._homeService.get4id().subscribe(_ids => {
      if (isNaN(_ids.profile) || _ids.profile < 1) {
        swal({
          title: "Seems like you do not have a profile yet!",
          text: "Create one now!",
          type: "info"
        });
        // alert("Invalid User ID");
        this._router.navigate(['/users/create']);
        return false;
      }
    });


      this._homeService.get4id().subscribe(_data => {
        this.currentuid = _data;
        this.currentuid = this.currentuid.user;
        if (this.currentuid) {
          this.liked_count = 0;
          this.createdp = new Array();
          this.supervisedp = new Array();
          this.likedp =  new Array();

          this._userService.getRealUser(this.currentuid)
            .subscribe(_user => {
              _user.uid = this.currentuid;
              _user.first = _user.first;
              _user.last = _user.last;
              _user.role = _user.groups;
              if (_user.role[0] === 1) {
                _user.role = 'Supervisor';
              }
              if (_user.role[0] === 2) {
                _user.role = 'Student';
              }


              this.user = _user;
              this.role = this.user.role;
            });

          this._projectService.getUserLikedProject(this.currentuid) //////////////real user
            .subscribe(_liked => {
              for (let x = 0; x < _liked.length; x++) {
                _liked[x].created = _liked[x].created_date;
                _liked[x].pid = _liked[x].project_id;
                _liked[x].name = _liked[x].project_title;
                _liked[x].liked_number = _liked[x].liked_by_people_number;
                _liked[x].abs = _liked[x].project_short_description;
                _liked[x].status = _liked[x].project_status;
                this.likedp.push(_liked[x]);
              }
            });


          this._projectService.getUserCreatedProject(this.currentuid)
            .subscribe(_created => {
              for (let x = 0; x < _created.length; x++) {
                _created[x].created = _created[x].created_date;
                _created[x].pid = _created[x].project_id;
                _created[x].name = _created[x].project_title;
                _created[x].liked_number = _created[x].liked_by_people_number;
                _created[x].abs = _created[x].project_short_description;
                _created[x].status = _created[x].project_status;
                this.createdp.push(_created[x]);
              }
            });

          this._projectService.getUserSupervisedProject(this.currentuid) ///////////////////real user
            .subscribe(_supervised => {
              for (let x = 0; x < _supervised.length; x++) {
                _supervised[x].created = _supervised[x].created_date;
                _supervised[x].pid = _supervised[x].project_id;
                _supervised[x].name = _supervised[x].project_title;
                _supervised[x].liked_number = _supervised[x].liked_by_people_number;
                _supervised[x].abs = _supervised[x].project_short_description;
                _supervised[x].status = _supervised[x].project_status;
                this.supervisedp.push(_supervised[x]);
              }
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

  like(like_or_not, pid, uid) {


      this._projectService.postRemoveLiked(pid, uid)
        .subscribe(result => {
          console.log(result);
        });


    this.ngOnInit ();
  }

}
