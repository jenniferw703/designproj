import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

declare var swal: any;

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _auth: AuthService
  ) { }

  canActivate() {
    // if (!this._auth.authed()) {
    //   // swal({
    //   //   title: "Not Logged In",
    //   //   type: "error"
    //   // });

    //   this._router.navigate(['/login']);
    //   return false;
    // }

    
    // this._auth.authed().subscribe(_data => {
    //   console.log("AuthGuard - canAct", _data);
    //   return true;
    // }, _err => {
    //   console.log("AuthGuard - Error", _err);
    //   return false;
    // });

    return true;
  }

}
