import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';


@Injectable()
export class UserGuard implements CanActivate {
    user: User;
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user != null || this.user != undefined) {
            return true;
        } else {
            this.router.navigate(['auth']);
            return false;
        }
    }
}