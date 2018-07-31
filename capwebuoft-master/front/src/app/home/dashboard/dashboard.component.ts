import { Component, OnInit } from '@angular/core';
import { IProject, IOption } from '../interface';
import { ProjectService } from '../projects/project-service/project.service';
import { UserService } from '../users/user-service/user.service';
import { TeamService } from '../teams/team-service/team.service';
import { HomeService } from '../shared/service/home.service';


declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //private projects: IProject[];
  private user;
  private project_total: number;
  private user_total: number;
  private team_total: number;
  private date: Date;
  private data;
  private data_to_render: any[];
  private filtered: any[];

  private s_search: string;


  private timeline;
  private timeline_ready = false;

  constructor(
    private _home: HomeService,
    private _projectService: ProjectService,
    private _UserService: UserService,
    private _TeamService: TeamService
  ) { }

  ngOnInit() {


    // this._home.getTimeline().subscribe(_data => {
    //   this.timeline = _data;
    // })


    this._projectService.getOpenProject()
      .subscribe(_projects => {
        this.project_total = _projects.count;

        //_projects = __projects['projects'];
        //this._projects = __projects['projects'];
        //console.log(typeof this.project_total);
        this.data = this.project_total;
        this.data_to_render = this.data;
      });

    this._UserService.getRealUsers()
      .subscribe(_users => {
        this.user_total = _users.length;
        //_projects = __projects['projects'];
        //this._projects = __projects['projects'];
        // console.log(this.projects);
        this.data = this.user_total;
        this.data_to_render = this.data;
      });

    this._TeamService.getRealTeams()
      .subscribe(_teams => {
        this.team_total = _teams.length;
        //_projects = __projects['projects'];
        //this._projects = __projects['projects'];
        // console.log(this.projects);
        this.data = this.team_total;
        this.data_to_render = this.data;
      });


    this._home.get4id().subscribe(_ids => {
      this._UserService.getRealUser(_ids.user).subscribe(_data => {
        this.user = {
          id: _ids.user,
          profile: _ids.profile,
          first: _data.first_name,
          last: _data.last_name,
        }
      })
    })

    this._home.getTimeline().subscribe(__data => {
      this.timeline = __data;
      this.timeline_ready = true;
    });


    this.date = new Date;
    this.data = this.date;
    this.data_to_render = this.data;

  }

  post_timeline() {
    if (!$('#tlcontent').val().trim())
      return;

    let item = {
      "userprofile_id": this.user.profile,
      "content": $('#tlcontent').val(),
    }

    // this.timeline.unshift(item);

    this._home.postTimeline(item).subscribe(__res => {
      this._home.getTimeline().subscribe(__data => {
        this.timeline = __data;
      })
    })
  }

}
