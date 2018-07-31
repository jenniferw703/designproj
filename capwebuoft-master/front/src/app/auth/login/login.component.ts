import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HomeService } from '../../home/shared/service/home.service';

declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private cred;
  private error;

  constructor(
    private _auth: AuthService,
    private _home: HomeService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.cred = {
      username: "",
      password: ""
    };

    this.error = false;

    // if (this._auth.authed()) {
    //   this._router.navigate(['/dashboard'])
    // }
    this._home.get4id().subscribe(_data => {
      console.log("authed already");
      this._router.navigate(['/dashboard']);
    })
  }



  submit() {
    this._auth.login(this.cred).subscribe(_data => {
      console.log(document.cookie);
      this._router.navigate(['/dashboard'])
    }, err => {
      if (err.status == 401) {
        swal({
          title: "Unauthorized!",
          text: err.error.message,
          type: "error"
        });
      } else {
        swal({
          title: "Unknow error!",
          text: "Please clear cache & login again!",
          type: "error"
        });
      }
    });

    //  this._router.navigate(['/dashboard']);
    
  }

}
