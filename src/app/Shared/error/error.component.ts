import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {AuthService} from "../../Security/Services/auth.service";
import {LoginService} from "../../Security/Services/login.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(private router: Router,private loginService:LoginService) {}

  redirectToLogin() {
    this.loginService.logout();
    this.router.navigate(['/login']); // Replace with your actual login page route
  }
}
