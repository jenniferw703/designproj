import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { IUser } from '../../interface';
import { UserService } from '../user-service/user.service';
import { ProjectService } from '../../projects/project-service/project.service';
import { Router } from '@angular/router';
import { HomeService } from '../../shared/service/home.service';


declare var $: any;
declare var swal: any;
function Is_same(Object1:{ company: string, title: string}, Object2:{ company: string, title: string}){
  if(Object1.company === Object2.company && Object1.title === Object2.title)
    return true;
  else 
    return false;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})



export class UserEditComponent implements OnInit {

  private user: IUser = {};
  private ready: boolean;
  private currentuid;
  private currentpid;
  private email_pattern: string;
  private interested_areas: any[];
  private experience : any[];
  private work_experience: { company: string, title: string} = {company: "", title: ""};
  private work_experience2: { company: string, title: string} = {company: "", title: ""};
  private work_experience3: { company: string, title: string} = {company: "", title: ""};

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _homeService: HomeService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.ready = false;
    this.experience = [];

    this._homeService.get4id().subscribe(_data => {
      this.currentuid = _data.user;
      this.currentpid = _data.profile;
      this._userService.getProfile(this.currentpid)
        .subscribe(_user => {
          console.log('user check:',_user);
          _user.profile_id = this.currentpid;
          _user.uid = this.currentuid;
          _user.modified = new Date();
          _user.modified_str = _user.modified.toISOString().substring(0, 10);
          _user.first = _user.user.first_name;
          _user.last = _user.user.last_name;
          _user.email = _user.user.email;

          //_user.tag ? _user.tags = _user.tag.split(" ") : null;
          _user.about = _user.about;
          // _user.team.tags = _user.team.tag.split(" ");
          this.user = _user;
          this.interested_areas = _user.related_areas;

          if(_user.experiences.length != 0) {
            if(_user.experiences.length == 1) {
              this.work_experience = _user.experiences[0];
            } else if (_user.experiences.length == 2) {
              this.work_experience = _user.experiences[0];
              this.work_experience2 = _user.experiences[1];
            }  else if (_user.experiences.length == 3) {
              this.work_experience = _user.experiences[0];
              this.work_experience2 = _user.experiences[1];
              this.work_experience3 = _user.experiences[2];
            }
          }
          this.user.areas = [
          ];
          //console.log("hey2:", this.interested_areas);
          this._projectService.getArea()
            .subscribe(_area => {
              for (let x = 0; x < _area.length; x++ ) {
                this.user.areas.push({'tag_name': _area[x].tag_name, 'value': false});
                for (let y = 0; y < this.interested_areas.length; y++ ) {
                  //console.log("hey3:", this.user.areas[x]," ",this.interested_areas[y]);
                  if (this.user.areas[x].tag_name === this.interested_areas[y].tag_name) {
                    this.user.areas[x].value = true;
                  }
                }
              }
            });
          //console.log("hey:", this.user.areas);
          console.log("user id ", this.user);
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

  }

  save_edit() {
    this.interested_areas = [];
    
    for (let area of this.user.areas) {
      if (area.value) {
        let item = {
          tag_name: area.tag_name
        }
        this.interested_areas.push(item);
      }
    }
    
    if(this.work_experience.company != ""){
      if(Is_same(this.work_experience, this.work_experience2))
        this.work_experience2.company = "";
      if(Is_same(this.work_experience, this.work_experience3))
        this.work_experience3.company = "";

      this.experience.push(this.work_experience);
    }
    if(this.work_experience2.company != ""){
      if(Is_same(this.work_experience2, this.work_experience3))
        this.work_experience3.company = "";
      this.experience.push(this.work_experience2);
    }
    if(this.work_experience3.company != "")
      this.experience.push(this.work_experience3);

    this._userService.editRealProfile(this.currentpid,this.user.about,this.interested_areas,this.experience).subscribe(_data => {

      console.log("ok", _data);
      swal({
        title: "Your profile has been edited successfully!",
        type: "success"
      });
      this._router.navigate(['/users/'+_data.user_profile_id]);
    }, _err => {
      swal({
        title: "Error!",
        text: _err,
        type: "error"
      });
    })
  }

}
