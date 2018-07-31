import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interface';
import { UserService } from '../user-service/user.service';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private users: IUser[];

  private data;
  private data_to_render: any[];
  private filtered: any[];

  private s_search: string;


  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {

    this._userService.getProfiles()
      .subscribe(_users => {
        this.users = [];
        for (let i = 0; i < _users.length; i++) {
          let item: IUser = {};
          item.first = _users[i].user.first_name;
          item.last = _users[i].user.last_name;
          item.email = _users[i].user.email;
          item.uid = _users[i].pk;

          // item.status = 25;

          item.s_str = item.first + " " + item.last + " " + item.email;
          item.s_str = item.s_str.toUpperCase();

          this.users.push(item);


          // _users[i].created = new Date();
          // _users[i].modified = new Date();
          // _users[i].modified_str = _users[i].modified.toISOString().substring(0, 10);

          // _users[i].tag ? _users[i].tags = _users[i].tag.split(" ") : null;
          // //_users[i].team.tag ? _users[i].team.tags = _users[i].team.tag.split(" ") : null;
          _users[i].s_str = _users[i].uid + " " + _users[i].utorid + " " + _users[i].name + " " + _users[i].email + " ";
          _users[i].s_str = _users[i].s_str.toUpperCase();
        }

        // this.users = _users;
        this.data = this.users;
        this.data_to_render = this.data;
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
