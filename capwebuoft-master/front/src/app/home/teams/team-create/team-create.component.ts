import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ITeam } from '../../interface';

import { TeamService } from '../team-service/team.service';
import { ProjectService } from '../../projects/project-service/project.service';
import { HomeService } from '../../shared/service/home.service';
import { UserService } from '../../users/user-service/user.service';
import { Router } from '@angular/router';

declare var $: any;
declare var swal: any;
type MyArrayType = Array<{ tag_name: string, value: boolean, pk: number }>;

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  private new_team: ITeam = {};
  private areas: MyArrayType = [];

  private email_pattern: string;

  private jq_summernote: boolean;
  private jq_datatable: boolean;

  private inpudisable: boolean;
  private steps: number;
  private steps_prev: number;
  private ready: boolean;

  private currentpid;

  constructor(
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _homeService: HomeService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.ready = false;

    this._homeService.get4id().subscribe(_data => {
      this.currentpid = _data;
      this.currentpid = this.currentpid.profile;
      this._userService.getProfile(this.currentpid)
        .subscribe(_user => {
          this.new_team.name = "";
          this.new_team.email = _user.user.email;
          this.new_team.cloud = "";
          this.new_team.created = new Date();
          this.new_team.modified = new Date();
          this.new_team.about = "";

          this._projectService.getArea()
          .subscribe(_areas => {
            let arr: MyArrayType = [];
            for (let x = 0; x < _areas.length; x++) {
              arr.push({
                'pk': _areas[x].pk,
                'tag_name': _areas[x].tag_name,
                'value': false
              });
            }
            this.areas = arr;
            this.new_team.areas = [];
          });      
          this.ready = true;
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

    this.inpudisable = true;
    this.steps = 1;
    this.steps_prev = 1;


  }

  ngAfterViewChecked() {
    if (this.jq_summernote) {
      $('.summernote').summernote({
        height: 200,
        minHeight: null,
        maxHeight: null,
        toolbar: [
          // [groupName, [list of button]]
          ['style', ['style']],
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['height', ['height']],
          ['fullscreen', ['fullscreen']]
        ]
      });
      $('.summernote').summernote('code', this.new_team.about);
      this.jq_summernote = false;
    }
    if (this.jq_datatable) {
      $('#new_teammates').dataTable();
      this.jq_datatable = false;
    }

  }

  steshow(step) {
    this.steps_prev = this.steps;
    this.steps = step;
    this.steps == 1 ? this.jq_summernote = true : this.save_summernote();
    this.steps == 2 ? this.jq_datatable = true : this.jq_datatable = false;
  }

  steprev() {
    this.steps_prev = this.steps;
    this.steps--;
    this.steshow(this.steps);
  }

  stenext() {
    this.steps_prev = this.steps;
    this.steps++;
    this.steshow(this.steps);
  }

  save_summernote() {
    this.steps != 1 && this.steps_prev == 1 ? this.new_team.about = $('.summernote').summernote('code') : null;
    this.jq_summernote = false;
  }


  save() {
    for (let area of this.areas) {
      if (area.value) {
        let item = {
          pk: area.pk,
          tag_name: area.tag_name
        }
        this.new_team.areas.push(item);
      }
    }

    console.log("New Team", this.new_team);
    this._teamService.postRealTeam(this.currentpid,this.new_team.name, this.new_team.magictoken,this.new_team.email,this.new_team.cloud,this.new_team.areas,this.new_team.about).subscribe(_data => {
      console.log("shuo de dui", _data);
      swal({
        title: "New team created!",
        type: "success"
      });
      this._router.navigate(['/teams/'+_data.team_id]);
    }, _err => {
      swal({
        title: "Error",
        text: _err,
        type: "error"
      });
    })
  }
}
