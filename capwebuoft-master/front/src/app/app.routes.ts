import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './auth/notfound/notfound.component';



import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SearchComponent } from './home/search/search.component';
import { FaqComponent } from './home/faq/faq.component';
import { CreateComponent } from './home/create/create.component';


import { UserListComponent } from './home/users/user-list/user-list.component';
import { UserProfileComponent } from './home/users/user-profile/user-profile.component';
import { UserNewComponent } from './home/users/user-new/user-new.component';
import { UserEditComponent } from './home/users/user-edit/user-edit.component';


import { TeamListComponent } from './home/teams/team-list/team-list.component';
import { TeamCreateComponent } from './home/teams/team-create/team-create.component';
import { TeamProfileComponent } from './home/teams/team-profile/team-profile.component';
import { TeamEditComponent } from './home/teams/team-edit/team-edit.component';



import { ProjectListingComponent } from './home/projects/projectListing/projectListing.component';
import { ProjectCreateComponent } from './home/projects/projectCreate/projectCreate.component';
import { ProjectEditComponent } from './home/projects/projectEdit/projectEdit.component';

import { ProjectDetailComponent } from './home/projects/projectDetail/projectDetail.component';
import { ProjectProfileComponent } from './home/projects/project-profile/project-profile.component';



import { UserGuardService } from './home/users/user-service/user-guard.service';
import { TeamGuardService } from './home/teams/team-service/team-guard.service';
import { ProjectGuardService } from './home/projects/project-service/project-guard.service';


export const _ROUTES: Routes = [
    // Main redirect
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '', component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'search', component: SearchComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'create', component: CreateComponent },



            { path: 'users', component: UserListComponent },
            { path: 'users/create', component: UserNewComponent },
            { path: 'users/:uid', canActivate: [UserGuardService], component: UserProfileComponent },
            { path: 'users/:uid/edit', component: UserEditComponent },



            { path: 'teams', component: TeamListComponent },
            { path: 'teams/create', component: TeamCreateComponent },
            { path: 'teams/:tid', canActivate: [TeamGuardService], component: TeamProfileComponent },
            { path: 'teams/:tid/edit', canActivate: [TeamGuardService], component: TeamEditComponent },



            { path: 'projects', component: ProjectListingComponent },
            { path: 'projects/create', component: ProjectCreateComponent },
            { path: 'projects/projectEdit/:pid', component: ProjectEditComponent },
            { path: 'projects/:pid', canActivate: [ProjectGuardService], component: ProjectDetailComponent },
            { path: 'projects/project-profile/:uid',  component: ProjectProfileComponent }


        ]
    },

    {
        path: '', component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'notfound', component: NotfoundComponent }
        ]
    },
    { path: '**', redirectTo: 'login' }
]
