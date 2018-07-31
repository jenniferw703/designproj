import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, RequiredValidator } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


declare var swal: any;


function checkPwd(AC: AbstractControl) {
  let password = AC.get('password').value;
  let confirmPassword = AC.get('confirmPassword').value;
  if (password != confirmPassword) {
    AC.get('confirmPassword').setErrors({ checkPwd: true })
  }
  else {
    return null;
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private User: object;
  private roleneeded: boolean;

  private role: any;
  private areas_all: any[];
  form: FormGroup;
  checkboxGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.roleneeded = false;
    this.role = [
      {
        "label": 'Student',
        "value": false
      },
      {
        "label": 'Professor',
        "value": false
      },
      {
        "label": 'Company',
        "value": false
      },
    ];

    this.form = this.fb.group({
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      role: ['', Validators.required],
    }, {
        validator: checkPwd
      });
  }

  // selectrole(name) {
  //   for (let x = 0; x < this.role.length; x++) {
  //     if (this.role === this.role[x].label) {
  //       this.roleneeded = true;
  //       this.role[x].value = true;
  //     } else {
  //       this.roleneeded = false;
  //       this.role[x].value = false;
  //     }
  //   }
  // }

  onSubmit() {
    // let temp = " ";
    // for (let i = 0; i < this.role.length; i++) {
    //   if (this.role[i].value === true)
    //     temp = this.role[i].label;
    // }
    //console.log("role",this.role);

    this.User = {
      "username": this.form.value.email, 
      "last_name": this.form.value.last,
      "first_name": this.form.value.first,
      "password": this.form.value.password,
      "email": this.form.value.email,
      "role": this.form.value.role
    };
   console.log("Reg Comp",this.User);

    this._auth.register(this.User).subscribe(_data => {
      // console.log("register comp", _data);
      swal({
        title: "Good Job!",
        text: "Please login",
        type: "success"
      });
      this._router.navigate(['/login'])
    }, err => {
      swal({
        title: "Username already used",
        text: "Please enter another username",
        type: "error"
      });
    });



  }

}
