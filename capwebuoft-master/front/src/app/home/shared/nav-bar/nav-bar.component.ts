import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    // this._auth.logout();
    // this._router.navigate(['/login']);
    this._auth.logout().subscribe(_data => {
      console.log("LOGOUT", _data);
      this._router.navigate(['/login']);
    })
  }

}
