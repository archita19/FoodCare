import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../user.service';
import { user } from './user';

@Injectable()
export class HomeResolver implements Resolve<user> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<user> {

     let users = new user();
    //user:User = new User();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        users=res;
        return resolve(users);
       
      }, err => {
        this.router.navigate(['/home']);
        return reject(err);
      })
    })
  }
}