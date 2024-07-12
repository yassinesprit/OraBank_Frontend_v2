import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor() { }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  getUserRole(json:any):string{
    const helper = new JwtHelperService();
    const role=helper.decodeToken(json).role;
    return role;
  }
}
