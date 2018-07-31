import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { UserService } from './user-service/user.service';
import { UserGuardService } from './user-service/user-guard.service';

import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';


@NgModule({
  imports: [SharedModule],
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserEditComponent,
    UserNewComponent
  ],
  providers: [UserService, UserGuardService]
})
export class UserModule { }


// export const USER_ROUTES = [
//   { path: 'users', component: UserListComponent },
//   { path: 'users/:uid', canActivate: [UserGuardService], component: UserProfileComponent },
//   { path: 'users/:uid/edit', component: UserEditComponent },
// ];
