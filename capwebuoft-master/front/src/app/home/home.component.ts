import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private app_ready: boolean = false;
  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
    console.log("Home Component")
    this._auth.authed().subscribe(_data => {
      console.log("AuthGuard - canAct", _data);
      this.app_ready = true;
    }, _err => {
      console.log("AuthGuard - Error", _err);
      this._router.navigate(['/login'])
      this.app_ready = false;
    });
  }

}
