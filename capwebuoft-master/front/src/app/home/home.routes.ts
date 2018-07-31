// import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from '../auth/service/auth-guard.service';
// import { HomeComponent } from './home.component';
// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { SearchComponent } from '../search/search.component';
// import { FaqComponent } from '../faq/faq.component';

// import { USER_ROUTES } from '../users/user.module';
// import { TEAM_ROUTES } from '../teams/team.module';
// import { PROJECT_ROUTES } from '../projects/project.module';
// import { MSG_ROUTES } from '../messages/message.module';

// const _children = [
//     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//     { path: 'dashboard', component: DashboardComponent },
//     { path: 'search', component: SearchComponent },
//     { path: 'faq', component: FaqComponent },
// ]

// var home_children = [];
// home_children = home_children.concat(_children, USER_ROUTES, TEAM_ROUTES, PROJECT_ROUTES, MSG_ROUTES);

// const _routes: Routes = [
//     {
//         path: '', canActivate: [AuthGuardService], component: HomeComponent,
//         children: home_children
//     },
//     { path: '**', redirectTo: '' },
// ];


// // export const HOME_ROUTES = RouterModule.forChild(_routes);
// export const HOME_ROUTES = RouterModule.forChild(_routes);


