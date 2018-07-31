import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

declare var swal: any;

@Injectable()
export class UserGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let uid = +route.url[1].path;
    if (isNaN(uid) || uid < 1) {
      swal({
        title: "Please complete your profile",
        type: "info"
      });
      // alert("Invalid User ID");
      this._router.navigate(['/users/create']);
      return false;
    };
    return true;
  }

}
