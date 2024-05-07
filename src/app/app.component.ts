import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'v2';
  curUser!:any;
  isLoggedIn: boolean = false;


  constructor(private router: Router) {}

  isLoginPage() {
    return this.router.url === '/login';
  }
  isErrorPage() {
    return this.router.url === '/error';
  }
  isResetPage(){
    return this.router.url === '/resetpassword';

  }
  isResetPage2(){
    return this.router.url.includes('/forgetpassword');

  }
  login() {
    this.isLoggedIn = true;
  }

}
