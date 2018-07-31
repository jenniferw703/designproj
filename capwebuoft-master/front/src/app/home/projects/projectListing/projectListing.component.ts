import { Component, OnInit } from '@angular/core';
import { IProject, IOption } from '../../interface';
import { ProjectService } from '../project-service/project.service';
import {HomeService} from '../../shared/service/home.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-projectListing',
  templateUrl: './projectListing.component.html',
  styleUrls: ['./projectListing.component.css']
})
export class ProjectListingComponent implements OnInit {

  private projects: IProject[];
  private liked_by_this_user: boolean;
  private data;
  private data_to_render: any[];
  private filtered: any[];

  private s_search: string;

  constructor(
    private _projectService: ProjectService,
    private _home: HomeService,
    private _router: Router

  ) { }

  ngOnInit() {



    if (!this.data_to_render) {
      console.log("there's no data yet");
    }
    else {
    }



    this._projectService.getProjects()
      .subscribe(_projects => {
        for (let i = 0; i < _projects.length; i++) {

          _projects[i].created = _projects[i].created_date;
          _projects[i].modified = _projects[i].updated_date;

          _projects[i].pid = _projects[i].project_id;

          _projects[i].owner_first_name = _projects[i].created_by.first_name;
          _projects[i].owner_last_name = _projects[i].created_by.last_name;
          _projects[i].owner_role = _projects[i].created_by.role;
          if (_projects[i].owner_role === 'Supervisor') {
            _projects[i].owner_role = 'Professor';
          }

          this._projectService.getProfileID( _projects[i].created_by.pk)
            .subscribe(_o => {
              _projects[i].uid = _o.profile_id;
            });


          _projects[i].name = _projects[i].project_title;
          _projects[i].liked_number = _projects[i].liked_by_people_number;

          _projects[i].abs = _projects[i].project_short_description;
          _projects[i].areas = new Array();
          for (let x = 0; x < _projects[i].related_areas.length; x++ ) {
            _projects[i].areas.push({'label':_projects[i].related_areas[x], 'value' : true});
          }
          _projects[i].tags = _projects[i].related_areas;
          _projects[i].status = _projects[i].project_status;
          _projects[i].s_str = _projects[i].pid + " "  + " " + _projects[i].name + " " + _projects[i].owner_first_name + " " + _projects[i].owner_last_name + " " + _projects[i].status + " " + _projects[i].abs + " " + _projects[i].owner_role;
          _projects[i].s_str = _projects[i].s_str.toUpperCase();
        }

        this.projects = _projects;
        this.data = this.projects;
        this.data_to_render = this.data;
      });
  }

  str_filter() {
    if (!$('#search_str').val().trim()) {
      //console.log('heyo', typeof $('#search_str').val());
      this.data_to_render = this.data;
      return;
    }
    this.filtered = [];
    this.s_search = this.s_search.trim();
    var keys = this.s_search;//.split(" ");
    console.log("keys:", typeof keys, keys.length, keys);

    this.data.forEach(data => {
      //for (let i = 0; i < keys.length; i++) {
        if (data.s_str.indexOf(keys.toUpperCase()) !== -1) {
          console.log("Matched", data.s_str, keys);
          this.filtered.push(data);
        }
      //}
    });

    this.data_to_render = this.filtered;
  }


  getData() {


  }

}
