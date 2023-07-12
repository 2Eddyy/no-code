//rolesaccess.service.ts
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";

@Injectable()
export class RolesAccessService implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {

        const userObj = JSON.parse(localStorage.getItem('userObj') || '{}');
        const customerSession = JSON.parse(localStorage.getItem('customerSession') || '{}');
        const roles = userObj.user.roles || [];
        return true;
    }
}
