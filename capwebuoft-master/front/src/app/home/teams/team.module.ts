import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { TeamProfileComponent } from './team-profile/team-profile.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamCreateComponent } from './team-create/team-create.component';

import { TeamService } from './team-service/team.service';
import { TeamGuardService } from './team-service/team-guard.service';
import { TeamEditComponent } from './team-edit/team-edit.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    TeamProfileComponent,
    TeamListComponent,
    TeamCreateComponent,
    TeamEditComponent,
  ],
  providers: [TeamService, TeamGuardService]
})
export class TeamModule { }


// export const TEAM_ROUTES = [
//   { path: 'teams', component: TeamListComponent },
//   { path: 'teams/create', component: TeamCreateComponent },
//   { path: 'teams/:tid', canActivate: [TeamGuardService], component: TeamProfileComponent },
//   { path: 'teams/:tid/edit', canActivate: [TeamGuardService], component: TeamEditComponent },
// ];

