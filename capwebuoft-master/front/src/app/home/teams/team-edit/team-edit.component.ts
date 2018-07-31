import { Component, OnInit } from '@angular/core';

import { ITeam } from '../../interface';

import { TeamService } from '../team-service/team.service';
import { ProjectService } from '../../projects/project-service/project.service';

import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../shared/service/home.service';
import { Router } from '@angular/router';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  private team: ITeam;
  private ready: boolean;
  private email_pattern: string;

  private jq_summernote: boolean;
  private jq_datatable: boolean;

  private inpudisable: boolean;
  private steps: number;
  private steps_prev: number;

  private interested_areas: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _home: HomeService,
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.ready = false;
    let tid = +this._route.snapshot.paramMap.get('tid');

    this._teamService.getTeamforUser(tid)
      .subscribe(_team => {
        if(_team.related_areas != undefined) {
          this.interested_areas = _team.related_areas;
        }

        this.team = _team;

        this.team.areas = [];

        this._projectService.getArea()
          .subscribe(_area => {
            for (let x = 0; x < _area.length; x++) {
              this.team.areas.push({ 'pk': _area[x].pk, 'tag_name': _area[x].tag_name, 'value': false });
              for (let y = 0; y < this.interested_areas.length; y++) {
                if (this.team.areas[x].tag_name === this.interested_areas[y].tag_name) {
                  this.team.areas[x].value = true;
                }
              }
            } 
          });

        this.ready = true;
      })


    this.email_pattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    this.jq_summernote = true;
    this.jq_datatable = false;

    this.inpudisable = true;
    this.steps = 1;
    this.steps_prev = 1;


  }

  ngAfterViewChecked() {
    if (this.jq_summernote && this.ready) {
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
      $('.summernote').summernote('code', this.team.about);
      this.jq_summernote = false;
    }
    if (this.jq_datatable) {
      $('#teammates').dataTable();
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
    this.team.about = $('.summernote').summernote('code');
    this.jq_summernote = false;
  }

  save() {
    this.interested_areas = [];
    this.interested_areas = this.team.areas;
    this.team.areas = [];
    this.save_summernote();
    
    for (let area of this.interested_areas) {
      if (area.value) {
        let item = {
          tag_name: area.tag_name
        }
        this.team.areas.push(item);
      }
    }
    //this._teamService.postRealTeams(this.new_team).subscribe(_data => {console.log("success",_data)}, _err => {console.log("no", _err)})
    this._teamService.editRealTeam(this.team.pk,this.team.name,this.team.magictoken,this.team.email,this.team.cloud,this.team.about,this.team.areas) .subscribe(__data => {
      console.log("ok", __data);
      swal({
        title: "Your team has been edited successfully!",
        type: "success"
      });
      this._router.navigate(['/teams/'+__data.team_id]);
    }, _err => {
      swal({
        title: "Error!",
        text: _err,
        type: "error"
      });
    })
  }

}
