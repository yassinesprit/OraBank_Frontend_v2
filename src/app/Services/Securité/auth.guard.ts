import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwt = new JwtHelperService();
    const token = localStorage.getItem('token');
    const allowedRoles = route.data['roles'] as string[]  ;
    const userRoles = this.authService.getUserRole(localStorage.getItem('token'));


    if (jwt.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }
    if (!userRoles || !allowedRoles.some(r => userRoles.includes(r))) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
