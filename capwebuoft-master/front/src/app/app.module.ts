import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, ROUTES } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';


import { AppComponent } from './app.component';


import { AuthGuardService } from './auth/service/auth-guard.service';
import { AuthService } from './auth/service/auth.service';

import { _ROUTES } from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HomeModule,
    RouterModule.forRoot(_ROUTES)
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
