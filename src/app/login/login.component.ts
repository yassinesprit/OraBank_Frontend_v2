import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../Security/Services/login.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationRequest} from '../Model/AuthenticationRequest';
import Swal from 'sweetalert2';
import {AuthService} from '../Security/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Ensure this matches your actual CSS file name
})
export class LoginComponent implements OnInit {
  userName: string = '';
  userPassword: string = '';
  errorMessage: string = '';
  private helper = new JwtHelperService();

  constructor(private router: Router, private loginService: LoginService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    const userName = loginForm.controls['userName'].value;
    const userPassword = loginForm.controls['userPassword'].value;

    let authAttempt = new AuthenticationRequest(userName, userPassword);
    this.loginService.login(authAttempt).subscribe(
      resp => {
        loginForm.resetForm();
        const test = JSON.stringify(resp.body);
        const test1 = JSON.parse(test);
        console.log(test1.token);
        localStorage.setItem('token', test1.token);
        localStorage.setItem('role', this.authService.getUserRole(test1.token));
        console.log(localStorage.getItem('token'));
        const username = this.helper.decodeToken(test1.token).sub;
        console.log(username);
        localStorage.setItem('username', username);
        Swal.fire({
          title: 'Parfait!',
          text: 'Vous êtes connectés en tant que ' + username,
          icon: 'success'
        });
        console.log(this.authService.getUserRole(test1.token));
          this.router.navigate(['/admin/home']);
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Verifier vos donnés entrés',
            text: 'les informations d\'identification invalides!'
          });
        }
      }
    );
  }
}
