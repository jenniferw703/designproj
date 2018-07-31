import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

declare var swal: any;

@Injectable()
export class TeamGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let tid = +route.url[1].path;
    if (isNaN(tid) || tid < 1) {
      swal({
        title: "Invalid Team ID",
        type: "error"
      });
      // alert("Invalid Team ID");
      // this._router.navigate(['/404']);
      return false;
    };
    return true;
  }

}
