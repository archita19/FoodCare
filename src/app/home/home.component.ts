import { Component, OnInit } from '@angular/core';
import { user } from './user';
import { UserService } from '../user.service';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users : user ;
  userName : string = "";
  signedIn : boolean = false;
  email:string;

  constructor(public userService : UserService,public authService: AuthService,private router: Router) { 
   
    this.getUserInfo();
    //window.alert("before")
    
  }
  getUserInfo(){
    this.userService.getCurrentUser().then(
      res => { 
        this.users = res;
      }
    );
  }
  ngOnInit() {
    //window.location.reload();
    
  }
  
    
  



  clickLogin(){
    this.signedIn = !this.signedIn;
    this.getUserInfo();
  }

  Logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }
}
