import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { user } from '../home/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  user:user;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
   }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

 
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/home']);
     // window.alert("logged in");
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  // googleSignIn(){
  //   this.authService.GoogleAuth().then(res => {
  //     this.user = res;
  //   })
  // }
  
  ngOnInit() {
  }

}
