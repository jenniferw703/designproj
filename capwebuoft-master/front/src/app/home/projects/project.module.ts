import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { ProjectListingComponent } from './projectListing/projectListing.component';
import { ProjectCreateComponent } from './projectCreate/projectCreate.component';
import { ProjectDetailComponent } from './projectDetail/projectDetail.component';
import { ProjectEditComponent } from './projectEdit/projectEdit.component';


import { ProjectService } from './project-service/project.service';
import { ProjectGuardService } from './project-service/project-guard.service';




@NgModule({
  imports: [SharedModule],
  declarations: [
    ProjectProfileComponent,
    ProjectListingComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    ProjectEditComponent
  ],
  providers: [
    ProjectService,
    ProjectGuardService,
  ]
})
export class ProjectModule { }



// export const PROJECT_ROUTES = [
//   { path: 'projects', component: ProjectListingComponent },
//   //{ path: 'projects/project-list', component: ProjectListComponent },

//   { path: 'projects/create', component: ProjectCreateComponent },
//   //{ path: 'projects/projectDetail', component: ProjectDetailComponent },
//   { path: 'projects/projectEdit/:pid', component: ProjectEditComponent },

//   { path: 'projects/projectSearch', component: ProjectSearchComponent },
//   { path: 'projects/:pid', canActivate: [ProjectGuardService], component: ProjectDetailComponent },
//   { path: 'projects/project-profile/:uid', component: ProjectProfileComponent },
// ]
