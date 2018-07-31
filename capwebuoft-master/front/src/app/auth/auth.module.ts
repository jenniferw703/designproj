import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../home/shared/shared.module';
import { RouterModule } from '@angular/router';


import { AuthComponent } from './auth.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    NotfoundComponent,
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
