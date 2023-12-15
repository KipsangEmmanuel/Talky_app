import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ResetComponent } from './auth/reset/reset.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { PhotosComponent } from './photos/photos.component';
import { PersonalInfoComponent } from './settings/personal-info/personal-info.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AettingsComponent } from './settings/aettings/aettings.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    NewsfeedComponent,
    FriendsComponent,
    AboutComponent,
    ProfileComponent,
    PhotosComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    AettingsComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
