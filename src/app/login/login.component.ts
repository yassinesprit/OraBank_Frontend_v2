import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../Model/AuthenticationRequest";
import {LoginService} from "../Services/Securité/login.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientService} from "../Services/Client/client.service";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameValue!: string;
  passwordValue!: string;
  private helper = new JwtHelperService();
  constructor(private router: Router,  private loginService: LoginService,private clientService:ClientService) { }

  login() {
    let authAttempt=new AuthenticationRequest(this.usernameValue,this.passwordValue)
    this.loginService.login(authAttempt).subscribe(
      resp=>{
        const test=JSON.stringify(resp.body);
        const test1=JSON.parse(test);
        console.log(test1.token);
        localStorage.setItem('token', test1.token);
        console.log(localStorage.getItem('token'))
        const username = this.helper.decodeToken(test1.token).sub;
        console.log(username);
        localStorage.setItem('username', username);
        Swal.fire({
          title: "Parfait!",
          text: "Vous êtes connectés en tant que "+username,
          icon: "success"
        });
        this.router.navigate(['/choisirCompte']);
      }
      , error => {
        console.error(error);
        if (error.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Verifier vos donnés entrés",
            text: "les informations d'identification invalides!",
          });
        };
      })
  }
}
