import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import {IProject, ITeam, IUser} from '../../interface';

import { UserService } from '../../users/user-service/user.service';
import { TeamService } from '../../teams/team-service/team.service';
import { ProjectService } from '../project-service/project.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HomeService } from '../../shared/service/home.service';

declare var $: any;


@Component({
  selector: 'app-projectEdit',
  templateUrl: './projectEdit.component.html',
  styleUrls: ['./projectEdit.component.css']
})
export class ProjectEditComponent implements OnInit {
  private user: IUser;
  private currentuid;
  private my_project: IProject;
  private sizeneeded: boolean;
  private areaneeded: boolean;
  private statusneeded: boolean;
  private email_pattern: string;
  private user_is_supervisor: boolean;
  private user_is_owner: boolean;

  private jq_summernote: boolean;
  private jq_datatable: boolean;
  private checkedarea: any[];
  private checkedsize: number;
  private checkedstatus: string;
  //private temp_size: number;

  private uid: number;
  private inpup_disable: boolean;
  private steps: number;
  private steps_prev: number;

  constructor(

    private _route: ActivatedRoute,
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _homeService: HomeService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.sizeneeded = false;
    this.areaneeded = false;
    this.statusneeded = false;
    this.user_is_supervisor = false;
    this.user_is_owner = false;
    this.my_project = {
    };

    this._homeService.get4id().subscribe(_data => {
      this.currentuid = _data.user;
      //this.currentuid = this.currentuid.uid;
      const pid = +this._route.snapshot.paramMap.get('pid');

      this._userService.getRealUser(this.currentuid)
        .subscribe(_users => {
          _users.first = _users.first_name;
          _users.last = _users.last_name;
          _users.uid = this.currentuid;
          this.user = _users;

        });




      this._projectService.getProject(pid)
        .subscribe(_project => {
          this.my_project.pid = _project.project_id;
          this.my_project.owner_role = _project.created_by.role;

          this.my_project.oid = _project.created_by.pk; ////////////////////////// make this one to ;
          if ( _project.supervisor) {
            this.my_project.sid =  _project.supervisor.pk;
          }


          this._userService.getRealUser(this.currentuid)
            .subscribe(_user => { //////////////////////////should check user's role here not owner's
              if (this.my_project.oid !== this.currentuid ) {
                this.my_project.oid = 0;
                this.user_is_owner = false;
              } else {
                this.user_is_owner = true;

              }
              if (this.my_project.sid === this.currentuid ) {
                this.user_is_supervisor = true;
              }



              this.my_project.status = [
                { label: 'Open', value: false },
                { label: 'Closed', value: false },
              ];
              for (let x = 0; x < this.my_project.status.length ; x++ ) {
                if (_project.project_status === this.my_project.status[x].label) {
                  this.my_project.status[x].value = true;
                }
              }

              this.my_project.name = _project.project_title;
              this.my_project.size =  new Array();
              for (let x = 2; x < 5 ; x++ ) {
                const y = x.toString();
                if (y !== _project.number_of_members_accepted.toString()) {
                  this.my_project.size.push({label: y, value: false});
                }

                else {
                  this.my_project.size.push({label: y, value: true});
                }
              }
              this.my_project.owner_first_name = _project.created_by.first_name;
              this.my_project.owner_last_name = _project.created_by.last_name;
              this.my_project.tags = _project.related_areas;

              this.my_project.about = _project.project_detailed_description;
              this.my_project.abs = _project.project_short_description;
              this._projectService.getArea()
                .subscribe(_area => {
                  this.my_project.areas = new Array();
                  for (let x = 0; x < _area.length; x++ ) {
                    this.my_project.areas.push({'pk': _area[x].pk, 'tag_name': _area[x].tag_name, 'value': false});
                    for (let y = 0; y < this.my_project.tags.length; y++ ) {
                      if (this.my_project.areas[x].tag_name === this.my_project.tags[y] ) {
                        this.my_project.areas[x].value = true;

                      }
                    }
                  }

                });

            });

        });

    }, err => {
      $({
        title: "Not Logined",
        text: "Please Login",
        type: "error"
      });
      this._router.navigate(['/login']);
    });



    this.email_pattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    this.jq_summernote = true;
    this.jq_datatable = false;
    this.inpup_disable = true;
    this.steps = 1;
    this.steps_prev = 1;
  }



  selectstatus(status) {
    for (let x = 0; x < this.my_project.status.length ; x++ ) {
      if (status === this.my_project.status[x].label) {
        if (this.my_project.status[x].value) {
          this.my_project.status[x].value = false;
        } else {
          this.my_project.status[x].value = true;
        }
      } else {
        this.my_project.status[x].value = false;
      }
    }

  }

  selectsize(size) {
    for (let x = 0; x < this.my_project.size.length; x++ ) {
      if (size == this.my_project.size[x].label) {
        if (this.my_project.size[x].value) {
          this.my_project.size[x].value=false;
        } else {
          this.my_project.size[x].value=true;
        }
      } else {
        this.my_project.size[x].value=false;
      }
    }
  }

  getData() {

    this.checkedsize = 0;
    this.checkedstatus = 'N/A';
    this.my_project.name = $('#titlename').val();
    this.my_project.abs = $('#abstract').val();
    this.my_project.about = $('#longdes').val();
    console.log('title', this.my_project.name, 'abstract', this.my_project.abs, 'longdis', this.my_project.about);

    this.checkedarea = new Array();

    for (let i = 0; i < this.my_project.areas.length; i++) {
      if (this.my_project.areas[i].value)
        this.checkedarea.push({'pk': this.my_project.areas[i].pk, 'tag_name': this.my_project.areas[i].tag_name, 'value' : true});
    }

    console.log(this.checkedarea);

    for (let i = 0; i < this.my_project.size.length; i++) {
      if (this.my_project.size[i].value)
        this.checkedsize = Number(this.my_project.size[i].label);
    }

    console.log(this.checkedsize);

    for(let i = 0; i < 2; i++){
      if(this.my_project.status[i].value){
        this.checkedstatus = this.my_project.status[i].label;
      }
    }

    console.log(this.checkedstatus);

    if(this.checkedsize != 2 && this.checkedsize != 3 && this.checkedsize != 4 && this.checkedarea.length === 0 && this.checkedstatus != 'Open' && this.checkedstatus != 'Closed'){
      this.sizeneeded = true;
      this.areaneeded = true;
      this.statusneeded = true;
      //console.log(this.checkedsize, this.checkedarea);
    } else if (this.checkedsize != 2 && this.checkedsize != 3 && this.checkedsize != 4 && this.checkedstatus != 'Open' && this.checkedstatus != 'Closed'){
      this.sizeneeded = true;
      this.areaneeded = false;
      this.statusneeded = true;
      //console.log(this.checkedsize);
    } else if (this.checkedarea.length === 0 && this.checkedstatus != 'Open' && this.checkedstatus != 'Closed') {
      this.sizeneeded = false;
      this.areaneeded = true;
      this.statusneeded = true;
      //console.log(this.checkedarea);
    } else if (this.checkedsize != 2 && this.checkedsize != 3 && this.checkedsize != 4 && this.checkedarea.length === 0) {
      this.sizeneeded = true;
      this.areaneeded = true;
      this.statusneeded = false;
    } else if (this.checkedstatus != 'Open' && this.checkedstatus != 'Closed'){
      this.sizeneeded = false;
      this.areaneeded = false;
      this.statusneeded = true;
      //console.log(this.checkedsize);
    } else if (this.checkedarea.length === 0) {
      this.sizeneeded = false;
      this.areaneeded = true;
      this.statusneeded = false;
      //console.log(this.checkedarea);
    } else if (this.checkedsize != 2 && this.checkedsize != 3 && this.checkedsize != 4) {
      this.sizeneeded = true;
      this.areaneeded = false;
      this.statusneeded = false;
    } else {

      this._homeService.get4id().subscribe(_data => {
        this.currentuid = _data.user;
        const pid = +this._route.snapshot.paramMap.get('pid');
        this._projectService.postEditProject(this.currentuid, pid, this.my_project.name, this.checkedstatus, this.my_project.abs, this.my_project.about, this.checkedarea, this.checkedsize)
          .subscribe(result => {
            console.log(result);
            location.replace('/capweb/projects/' + result.project_id);
          });
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

}
