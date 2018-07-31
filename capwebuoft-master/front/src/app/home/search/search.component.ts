import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';
import { UserService } from '../users/user-service/user.service';
import { TeamService } from '../teams/team-service/team.service';
import { ProjectService } from '../projects/project-service/project.service';

import { IUser, ITeam, IProject, IOption, IPArea } from '../interface';

import { forEach } from '@angular/router/src/utils/collection';


declare var $: any;
type MyArrayType = Array<{ tag_name: string, value: boolean, pk: number }>;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private users: IUser[];
  private teams: ITeam[];
  private projects: IProject[];
  private areas: IPArea[];
  private data;
  private data_to_render: any[];
  private filtered: any[];

  private s_search: string;

  private s_user: boolean;
  private s_team: boolean;
  private s_project: boolean;

  private s_date_start: Date;
  private s_date_end: Date;

  private s_tsize: number;
  private s_psize: number;

  private s_available: boolean;
  private s_complete: boolean;

  private s_areas: IPArea[];
  constructor(
    private _searchService: SearchService,
    private _userService: UserService,
    private _teamService: TeamService,
    private _projectService: ProjectService
  ) { }

  ngOnInit() {

    // this.data = this._searchService.getData();
    this._userService.getProfiles()
      .subscribe(_users => {
        this.users = [];
        for (let i = 0; i < _users.length; i++) {
          let item: IUser = {};
          item.created = new Date();
          item.modified = new Date();
          item.modified_str = item.modified.toISOString().substring(0, 10);

          item.uid = _users[i].pk;
          item.hahaid = _users[i].pk;
          item.first = _users[i].user.first_name;
          item.last = _users[i].user.last_name;
          item.name = item.first + ' ' + item.last;
          item.email = _users[i].email;
          // item.status = 30;
          item.views = 251;
          item.about = _users[i].about;
          item.tags = [];

          item.s_name = item.name
          item.s_str = item.uid + " " + item.utorid + " " + item.name + " " + item.email;
          for (let k = 0; k < _users[i].related_areas.length; k++) {
            item.s_str = item.s_str + " " + _users[i].related_areas[k].tag_name;
            item.tags.push(_users[i].related_areas[k].tag_name);
          }
          item.s_str = item.s_str.toUpperCase();

          this.users.push(item);

          // _users[i].created = new Date();
          // _users[i].modified = new Date();
          // _users[i].modified_str = _users[i].modified.toISOString().substring(0, 10);
          // _users[i].tag ? _users[i].tags = _users[i].tag.split(" ") : null;
          // //_users[i].team.tag ? _users[i].team.tags = _users[i].team.tag.split(" ") : null;
          // _users[i].s_name = _users[i].name;
          // _users[i].s_str = _users[i].uid + " " + _users[i].utorid + " " + _users[i].name + " " + _users[i].email + " " + _users[i].tag;
          // _users[i].s_str = _users[i].s_str.toUpperCase();
        }
        //this.users = _users;
        this._teamService.getRealTeams()
          .subscribe(_teams => {
            for (let i = 0; i < _teams.length; i++) {
              _teams[i].tid = _teams[i].pk;
              _teams[i].hahaid = _teams[i].pk;
              _teams[i].s_name = _teams[i].name;
              _teams[i].s_str = _teams[i].tid + " " + _teams[i].oid + " " + _teams[i].name + " " + _teams[i].owner + " " + _teams[i].email + " ";
              _teams[i].s_str = _teams[i].s_str.toUpperCase();
            }
            this.teams = _teams;

            this._projectService.getProjects()
              .subscribe(_projects => {

                // console.log(this.projects);
                for (let i = 0; i < _projects.length; i++) {
                  _projects[i].created = _projects[i].created_date;
                  _projects[i].modified = _projects[i].updated_date;
                  _projects[i].pid = _projects[i].project_id;
                  _projects[i].hahaid = _projects[i].project_id;

                  _projects[i].owner_first_name = _projects[i].created_by.first_name;
                  _projects[i].owner_last_name = _projects[i].created_by.last_name;
                  _projects[i].owner_role = _projects[i].created_by.role;

                  //console.log(_projects[i].owner_first_name);
                  _projects[i].name = _projects[i].project_title;
                  _projects[i].liked_number = _projects[i].liked_by_people_number;
``
                  _projects[i].abs = _projects[i].project_short_description;
                  _projects[i].about = _projects[i].project_detailed_description;
                  _projects[i].areas = new Array();
                  for (let x = 0; x < _projects[i].related_areas.length; x++) {
                    // console.log(_projects[i].related_areas[3]);
                    _projects[i].areas.push({ 'tag_name': _projects[i].related_areas[x], 'value': true });
                  }
                  _projects[i].tags = _projects[i].related_areas;
                  _projects[i].size = _projects[i].number_of_members_accepted;

                  //console.log(_projects[i].tags);
                  _projects[i].status = _projects[i].project_status;


                  _projects[i].s_str = _projects[i].pid + " " + " " + _projects[i].name + " "+ _projects[i].status;
                  _projects[i].s_str = _projects[i].s_str.toUpperCase();

                }
                this.projects = _projects;

                this._projectService.getArea()
                  .subscribe(_areas => {
                    this.areas = new Array();
                    for (let x = 0; x < _areas.length; x++) {
                      // console.log(_projects[i].related_areas[3]);
                      this.areas.push({
                        'pk': _areas[x].pk,
                        'tag_name': _areas[x].tag_name,
                        'value': false
                      });
                    }
                    console.log(this.areas);
                    //this.areas = _areas;
                    this.data = [];
                    this.data = this.data.concat( this.projects, this.users, this.teams);

                    this.data_to_render = this.data;
                    console.log('what to render',this.data_to_render);
                  });
              });
          });
      });

    this.clear_filter();
  }

  private s_datepicker: boolean = false;

  ngAfterViewChecked() {
    if (!this.s_datepicker) {
      $('.input-daterange').datepicker({ format: 'yyyy-mm-dd' });
      // $('#date_start').datepicker('setDate', new Date());
      // $('#date_end').datepicker('setDate', new Date());
      this.s_datepicker = true;
    }

    $("#teamsize").TouchSpin({
      min: 2,
      max: 4,
      step: 1,
      verticalbuttons: true
    });

    $('#projectsize').TouchSpin({
      initval: 3,
      min: 2,
      max: 4,
      step: 1,
      verticalbuttons: true
    });
  }

  str_filter() {
    if (!$('#search_str').val().trim()) {
      console.log(typeof $('#search_str').val());
      this.bool_filter();
      return;
    }

    this.data_to_render = this.data;

    console.log("str_filter:", typeof this.s_search, this.s_search.length, this.s_search);
    this.untouched_filter() ? null : this.bool_filter();

    this.filtered = [];
    this.s_search = this.s_search.trim();
    var keys = this.s_search;//.split(" ");
    console.log("keys:", typeof keys, keys.length, keys);
    var str: string;
    this.data_to_render.forEach(data => {
      //for (let i = 0; i < keys.length; i++) {
        if (data.s_str.indexOf(keys.toUpperCase()) !== -1) {
          console.log("Matched", data.s_str, keys);
          this.filtered.push(data);
        }
      //}
    });

    //this.filtered.sort();
    this.data_to_render = this.filtered;
  }

  bool_filter() {
    this.data_to_render = this.data;
    console.log(typeof this.users[1].areas, this.users[1].areas);
    // console.log("Team Size:", $('#teamsize').val());
    if (this.untouched_filter()) {
      //this.str_filter();
      // this.data_to_render = this.data;
      return;
    }

    this.filtered = [];
    var check_all: boolean = (!this.s_user && !this.s_team && !this.s_project);

    if (this.s_user || check_all) {
      for (let i = 0; i < this.data_to_render.length; i++) {
        if (this.data_to_render[i].uid != undefined && this.date_check(this.data_to_render[i].modified)) {
          if (this.status_check(this.data_to_render[i].status)) {
            this.area_check(this.data_to_render[i].areas) ? this.filtered.push(this.data_to_render[i]) : null;
          }
        }
      }
    }

    if (this.s_team || check_all) {
      for (let i = 0; i < this.data_to_render.length; i++) {
        if (this.data_to_render[i].tid != undefined && this.date_check(this.data_to_render[i].modified)) {
          if (this.size_check(this.data_to_render[i].size, "team")) {
            if (this.status_check(this.data_to_render[i].status)) {
              this.area_check(this.data_to_render[i].areas) ? this.filtered.push(this.data_to_render[i]) : null;
            }
          }
        }

      }
    }

    if (this.s_project || check_all) {
      for (let i = 0; i < this.data_to_render.length; i++) {
        if (this.data_to_render[i].pid != undefined ) {
          if (this.size_check(this.data_to_render[i].size, "project")) {
            if (this.status_check_projects(this.data_to_render[i].status)) {
              this.area_check(this.data_to_render[i].areas) ? this.filtered.push(this.data_to_render[i]) : null;
            }
          }
        }
      }
    }


    //this.filtered.sort();
    this.data_to_render = this.filtered;
    console.log('filtered', this.data_to_render);

  }

  date_check(date: Date): boolean {
    this.s_date_start = $('#date_start').datepicker("getDate");
    this.s_date_end = $('#date_end').datepicker("getDate");
    if (this.s_date_start == null && this.s_date_end == null) return true;
    return (date >= this.s_date_start && date <= this.s_date_end);
  }

  size_check(size: number, data_src: string): boolean {
    var result: boolean = false;
    var inpusize: number;
    if (data_src == "team") {
      $('#teamsize').val() ? inpusize = $('#teamsize').val() : inpusize = null;
    }
    if (data_src == "project") {
      $('#projectsize').val() ? inpusize = $('#projectsize').val() : inpusize = null;
    }
    inpusize == size || inpusize == null ? result = true : result = false;
    return result;
  }

  area_check(item_areas): boolean {
    var areas_all: boolean = true;
    for (let i = 0; i < this.s_areas.length && areas_all; i++) {
      if (this.s_areas[i].value)
        areas_all = false;
    }
    if (areas_all) return areas_all;
    if (item_areas == undefined) return false;

    var result: boolean = false;
    this.s_areas.forEach(area => {
      for (let i = 0; i < item_areas.length && !result; i++) {
        if ((item_areas[i].tag_name == area.tag_name) && (item_areas[i].value == area.value)) {
          result = true;
        }
      }
    })
    return result;
  }

  status_check_projects(item_status): boolean {
    if (!this.s_available && !this.s_complete)
      return true;
    var resula: boolean = false;
    var resulc: boolean = false;
    this.s_available ? resula = (item_status == 'Open') : null;
    this.s_complete ? resulc = (item_status == 'Closed') : null;
    return resula || resulc;
  }

  status_check(item_status): boolean {
    if (!this.s_available && !this.s_complete)
      return true;
    var resula: boolean = false;
    var resulc: boolean = false;
    this.s_available ? resula = (item_status < 100) : null;
    this.s_complete ? resulc = (item_status == 100) : null;
    return resula || resulc;
  }

  untouched_filter(): boolean {
    var clean: boolean = true;
    if (this.s_user || this.s_team || this.s_project) {
      clean = false;
      return clean;
    }
    if (this.s_available || this.s_complete) {
      clean = false;
      return clean;
    }

    for (let i = 0; i < this.s_areas.length && clean; i++) {
      if (this.s_areas[i].value)
        clean = false;
    }

    return clean;

  }

  clear_filter() {
    let arr: MyArrayType = [];
    this._projectService.getArea()
      .subscribe(_areas => {
        this.areas = new Array();
        for (let x = 0; x < _areas.length; x++) {
          // console.log(_projects[i].related_areas[3]);
          arr.push({
            'pk': _areas[x].pk,
            'tag_name': _areas[x].tag_name,
            'value': false
          });
        }
        //this.data = [];
        //this.data = this.areas;
        //this.data_to_render = this.data;
      });

    this.s_areas = arr;
    //console.log(this.s_areas);
    //this.s_areas = this.areas;
    //console.log(this.s_areas);
    this.s_user = false;
    this.s_team = false;
    this.s_project = false;

    this.s_available = false;
    this.s_complete = false;

    this.s_search = "";

    this.s_tsize = null;
    this.s_psize = null;

    this.data_to_render = this.data;

  }




  setall_filter() {
    let arr: MyArrayType = [];
    this._projectService.getArea()
      .subscribe(_areas => {
        this.areas = new Array();
        for (let x = 0; x < _areas.length; x++) {
          // console.log(_projects[i].related_areas[3]);
          arr.push({
            'pk': _areas[x].pk,
            'tag_name': _areas[x].tag_name,
            'value': false
          });
        }
        //this.data = [];
        //this.data = this.areas;
        //this.data_to_render = this.data;
      });

    this.s_areas = arr;
    console.log(this.s_areas);

    this.s_user = true;
    this.s_team = true;
    this.s_project = true;

    this.s_available = true;
    this.s_complete = true;

    this.data_to_render = this.data;

  }


}
