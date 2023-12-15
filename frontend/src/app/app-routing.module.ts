import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { FriendsComponent } from './friends/friends.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { PhotosComponent } from './photos/photos.component';
import { AettingsComponent } from './settings/aettings/aettings.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'reset', component: ResetComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'settings', component: AettingsComponent },
  {path: '', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
