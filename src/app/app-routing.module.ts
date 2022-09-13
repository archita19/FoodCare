import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestSensorsComponent } from './test-sensors/test-sensors.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeResolver } from './home/home.resolver';



const routes: Routes = [
  {path : 'test-sensors', component : TestSensorsComponent},
  {path : '', redirectTo : '/home', pathMatch : 'full'},
  {path : 'home', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup',component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
