import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MessageModule } from './messages/message.module';
import { UserModule } from './users/user.module';
import { TeamModule } from './teams/team.module';
import { ProjectModule } from './projects/project.module';


import { SearchService } from './search/search.service';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/service/auth-guard.service';
import { CreateComponent } from './create/create.component';

// import { HOME_ROUTES } from './home.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MessageModule,
    UserModule,
    TeamModule,
    ProjectModule,
    RouterModule
    
    //HOME_ROUTES
    
    // RouterModule.forChild([
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //   //{ path: '**', redirectTo: 'dashboard'}, //component: NotFoundComponent},
    //   { path: 'dashboard', component: DashboardComponent },
    //   { path: 'search', component: SearchComponent },
    //   { path: 'faq', component: FaqComponent },
    // ])
    // RouterModule.forChild([
    //   {
    //     path: '', canActivate: [AuthGuardService], component: HomeComponent,
    //     children: [
    //       { path: 'dashboard', component: DashboardComponent },
    //       { path: 'search', component: SearchComponent },
    //       { path: 'faq', component: FaqComponent }
    //     ]
    //   },
    //   { path: '**', redirectTo: ''}, //component: NotFoundComponent},

    // ])
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    SearchComponent,
    FaqComponent,
    CreateComponent,
  ],
  providers: [
    SearchService
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
    SearchComponent,
    FaqComponent,
    SharedModule,
    MessageModule,
    UserModule,
    TeamModule,
    ProjectModule,
  ],
})
export class HomeModule { }
