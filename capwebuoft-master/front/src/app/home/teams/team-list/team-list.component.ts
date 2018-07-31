import { Component, OnInit } from '@angular/core';
import { ITeam } from '../../interface';
import { TeamService } from '../team-service/team.service';
import { UserService } from '../../users/user-service/user.service';

declare var $: any;

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  private teams: ITeam[];
  private ready = false;

  private data;
  private data_to_render: any[];
  private filtered: any[];

  private s_search: string;


  constructor(
    private _userService: UserService,
    private _teamService: TeamService
  ) { }

  ngOnInit() {
    this._teamService.getRealTeams()
      .subscribe(_teams => {
        for (let i = 0; i < _teams.length; i++) {
          _teams[i].tid = _teams[i].pk;
          _teams[i].oid = _teams[i].owner.pk;
          _teams[i].s_str = _teams[i].tid + " " + _teams[i].oid + " " + _teams[i].name + " " + _teams[i].owner.user.first_name + " " + _teams[i].owner.user.last_name + " " + _teams[i].email + " ";
          _teams[i].s_str = _teams[i].s_str.toUpperCase();
        }
        this.teams = _teams;
        this.data = this.teams;
        this.data_to_render = this.data;
        this.ready = true;

      });
  }

  str_filter() {
    if (!$('#search_str').val().trim()) {
      console.log(typeof $('#search_str').val());
      this.data_to_render = this.data;
      return;
    }
    this.filtered = [];
    this.s_search = this.s_search.trim();
    var keys = this.s_search.split(" ");
    console.log("keys:", typeof keys, keys.length, keys);

    this.data.forEach(data => {
      for (let i = 0; i < keys.length; i++) {
        if (data.s_str.indexOf(keys[i].toUpperCase()) !== -1) {
          console.log("Matched", data.s_str, keys[i]);
          this.filtered.push(data);
        }
      }
    });

    this.data_to_render = this.filtered;
  }

}
