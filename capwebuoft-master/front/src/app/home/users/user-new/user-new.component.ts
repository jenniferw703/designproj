import { Component, OnInit } from '@angular/core';
import { IUser, profileForm, userForm } from '../../interface';
import { UserService } from '../user-service/user.service';
import { ProjectService } from '../../projects/project-service/project.service';
import { HomeService } from '../../shared/service/home.service';
import { Router } from '@angular/router';


declare var $: any;
declare var swal: any;
function Is_same(Object1:{ company: string, title: string}, Object2:{ company: string, title: string}){
  if(Object1.company === Object2.company && Object1.title === Object2.title)
    return true;
  else 
    return false;
}


type MyArrayType = Array<{ tag_name: string, value: boolean, pk: number }>;


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  private profile_form: profileForm = {};
  private user_form: userForm = {};

  private areas: MyArrayType = [];

  private ready: boolean;
  private email_pattern: string;

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

    this._homeService.get4id().subscribe(_ids => {

      this._userService.getRealUser(_ids.user).subscribe(_user_data => {

        this.user_form.pk = _user_data.id;
        this.user_form.first_name = _user_data.first_name;
        this.user_form.last_name = _user_data.last_name;

        this._projectService.getArea()
          .subscribe(_areas => {
            let arr: MyArrayType = [];
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

            // used data
            this.profile_form.user_id = _user_data.id;
            this.profile_form.about = "";
            this.profile_form.related_areas = [];
            this.profile_form.experience = [];
            this.areas = arr;


            // unused data
            this.profile_form.utorid = "";
            this.profile_form.gender = "";
            this.profile_form.branch = "",
              this.profile_form.views = 0,
              this.profile_form.linkedin = "",
              this.profile_form.status = 0,


              this.ready = true;
          });



      })


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



  save() {
    for (let area of this.areas) {
      if (area.value) {
        let item = {
          tag_name: area.tag_name
        }
        this.profile_form.related_areas.push(item);
      }
    }

    if(this.work_experience.company != ""){
      if(Is_same(this.work_experience, this.work_experience2))
        this.work_experience2.company = "";
      if(Is_same(this.work_experience, this.work_experience3))
        this.work_experience3.company = "";

      this.profile_form.experience.push(this.work_experience);
    }
    if(this.work_experience2.company != ""){
      if(Is_same(this.work_experience2, this.work_experience3))
        this.work_experience3.company = "";
      this.profile_form.experience.push(this.work_experience2);
    }
    if(this.work_experience3.company != "")
      this.profile_form.experience.push(this.work_experience3);

    //console.log(this.profile_form.experience);

    console.log("New Profile", this.profile_form);
    this._userService.postRealProfile(this.profile_form.user_id,this.profile_form.about,this.profile_form.related_areas,this.profile_form.experience).subscribe(_data => {
      console.log("shuo de dui", _data);
      swal({
        title: "New profile created!",
        type: "success"
      });
      // location.reload();
      this._router.navigate(['/users/'+_data.user_profile_id]);
    }, _err => {
      swal({
        title: "Not good.",
        text: _err,
        type: "error"
      });
    })
    
  }
}
