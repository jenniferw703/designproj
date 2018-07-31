import { Component, OnInit } from '@angular/core';

import { UserService } from '../../users/user-service/user.service';
import { TeamService } from '../team-service/team.service';
import { ProjectService } from '../../projects/project-service/project.service';

import { ITeam } from '../../interface';
import { HomeService } from '../../shared/service/home.service';
import { ActivatedRoute } from '@angular/router';

declare var swal: any;
type MyArrayType = Array<{ tag_name: string, value: boolean, pk: number }>;

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})

export class TeamProfileComponent implements OnInit {

  private user;
  private team;
  private mtoken = "";
  private ready = false;
  private areas: MyArrayType = [];

  constructor(
    private _route: ActivatedRoute,
    private _home: HomeService,
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService
  ) { }

  ngOnInit() {
    let tid = +this._route.snapshot.paramMap.get('tid');
    console.log('gaga', tid);

    this._home.get4id().subscribe(__ids => {
      this.user = __ids;
      this._teamService.getTeamforUser(tid).subscribe(__team => {
        this.team = __team;
        this.ready = true;
      })
    });
  }
    

  joinTeam() {
    if(this.user.profile == undefined || this.user.profile < 0) {
      swal({
        title: "Empty User Profile!",
        text: "Please create your profile first!",
        type: "error"
      });
      return;
    }
    let __data = {
      team_id: this.team.pk,
      user_profile_id: this.user.profile,
      magictoken: this.mtoken
    }
    this._teamService.joinTeam(__data).subscribe(__res => {
      // swal({
      //   title: "Good Job!",
      //   text: "You typed the correct token value",
      //   type: "success"
      // });
      location.reload();
    }, __err => {
      swal({
        title: "Not good!",
        text: "Incorrect token value!",
        type: "error"
      });
    })
  }


  leaveTeam() {

    let __data = {
      team_id: this.team.pk,
      user_profile_id: this.user.profile,
    }

    this._teamService.leaveTeam(__data).subscribe(__res => {
      // swal({
      //   title: "Good Job!",
      //   text: "You leaved the team",
      //   type: "success"
      // });
      location.reload();
    }, __err => {
      swal({
        title: "Not good!",
        text: "Calm down!",
        type: "error"
      });
    })


  }

}
