import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { user } from './home/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usr:user
  email:string;

  constructor( public afAuth: AngularFireAuth, private router: Router,public userservice:UserService) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        // window.alert("in logout");
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }

  // async googleSignIn(){
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  // }

  googleSignout(){
    this.afAuth.auth.signOut();
    return this.router.navigate['/signup'];
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }  

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')

        this.router.navigate(['/home']);
        
          this.userservice.getCurrentUser().then(
            res => { 
              this.usr = res;
              this.email= this.usr.email;
              
              //  this.msg = "welcome";
              //this.signedIn = !this.signedIn;
            }
          );
        
       
    }).catch((error) => {
        console.log(error)
    })
  }
}
