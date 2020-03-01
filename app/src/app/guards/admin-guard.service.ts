import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';


@Injectable()
export class AdminGuard implements CanActivate {
    user: User;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user != null || this.user != undefined) {
            if (this.user.userRoll === "admin") {
                return true;
            } else {
                if (this.user != null || this.user != undefined) {
                    this.router.navigate(['/pages/products/sales']);
                    return false;
                }
            }
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}