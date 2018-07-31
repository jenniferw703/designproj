import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

declare var swal: any;

@Injectable()
export class ProjectGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let pid = +route.url[1].path;
    if (isNaN(pid) || pid < 1) {
      swal({
        title: "Invalid Project ID",
        type: "error"
      });
      // alert("Invalid Project ID");
      // this._router.navigate(['/projects']);
      return false;
    };
    return true;
  }

}
