import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import {IProject, ITeam} from '../../interface';

import { TeamService } from '../../teams/team-service/team.service';
import { ProjectService } from '../project-service/project.service';
import { HomeService } from '../../shared/service/home.service';
import { Router } from '@angular/router';

declare var $: any;
declare var swal: any;


@Component({
  selector: 'app-projectCreate',
  templateUrl: './projectCreate.component.html',
  styleUrls: ['./projectCreate.component.css']
})

export class ProjectCreateComponent implements OnInit {

  private new_project: IProject;
  private sizeneeded: boolean;
  private areaneeded: boolean;

  private email_pattern: string;
  private checkedarea: any[];
  private checkedsize: number;
  private jq_summernote: boolean;
  private jq_datatable: boolean;

  private inpup_disable: boolean;
  private steps: number;
  private steps_prev: number;

  private currentuid;

  constructor(
    private _teamService: TeamService,
    private _projectService: ProjectService,
    private _homeService: HomeService,
    private _router: Router

  ) { }

  ngOnInit() {
    this.sizeneeded = false;
    this.areaneeded = false;

    this.new_project = {

      magictoken: 110020,
      created: new Date(),
      modified: new Date(),
      views: 0
    };

    this._homeService.get4id().subscribe(_ids => {
      if (isNaN(_ids.profile) || _ids.profile < 1) {
        swal({
          title: "You need to create a profile first!",
          type: "info"
        });
        this._router.navigate(['/users/create']);
        return false;
      }
    });

    this._projectService.getArea()
      .subscribe(_project => {
        this.new_project.areas = new Array();
        for (let x = 0; x < _project.length; x++ ) {
          this.new_project.areas.push({'pk': _project[x].pk, 'tag_name': _project[x].tag_name, 'value' : false});
        }
      });


    this.new_project.size = [
      { label: '2', value: false },
      { label: '3', value: false },
      { label: '4', value: false },
    ];

    this.new_project.status = [
      { label: 'Open', value: true },
      { label: 'Closed', value: false },
    ];

    this.email_pattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

    this.jq_summernote = true;
    this.jq_datatable = false;

    this.inpup_disable = true;
    this.steps = 1;
    this.steps_prev = 1;


  }

  selectsize(size) {
  	for (let x = 0; x < this.new_project.size.length; x++ ) {
  		if (size == this.new_project.size[x].label) {
  		  if (this.new_project.size[x].value) {
  			this.new_project.size[x].value=false;
  		  } else {
  			this.new_project.size[x].value=true;
  		  }
  		} else {
  			this.new_project.size[x].value=false;
  		}
  	}
  }

  getData() {
    this.checkedsize = 0;
    this.new_project.name = $('#titlename').val();
    this.new_project.abs = $('#abstract').val();
    this.new_project.about = $('#longdes').val();
    console.log('title', this.new_project.name, 'abstract', this.new_project.abs, 'longdis', this.new_project.about);

    this.checkedarea = new Array();

    for (let i = 0; i < this.new_project.areas.length; i++) {
      if (this.new_project.areas[i].value)
        this.checkedarea.push({'pk': this.new_project.areas[i].pk, 'tag_name': this.new_project.areas[i].tag_name, 'value' : true});
    }




    for (let i = 0; i < this.new_project.size.length; i++) {
      if (this.new_project.size[i].value)
        this.checkedsize = Number(this.new_project.size[i].label);
    }



    if(this.checkedsize != 2 && this.checkedsize != 3 && this.checkedsize != 4 && this.checkedarea.length === 0){
      this.sizeneeded = true;
      this.areaneeded = true;
    } else if (this.checkedsize != 2 && this.checkedsize != 3 && this.checkedsize != 4){
      this.areaneeded = false;
      this.sizeneeded = true;
    } else if (this.checkedarea.length === 0) {
      this.sizeneeded = false;
      this.areaneeded = true;
   } else {
  this._homeService.get4id().subscribe(_data => {
    this.currentuid = _data;
    this.currentuid = this.currentuid.user;
    this._projectService.postCreateProject(this.currentuid, this.new_project.name, this.new_project.abs, this.new_project.about, this.checkedarea, this.checkedsize)
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
//location.reload();
}
}
