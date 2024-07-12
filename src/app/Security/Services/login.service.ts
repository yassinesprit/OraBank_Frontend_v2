import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationRequest} from "../../Model/AuthenticationRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private host: string = "http://localhost:9999";
  private jwtToken = "";
  private role: string = "";
  private username: string = "";
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {

  }

  login(authRequest: AuthenticationRequest) {
    console.log(authRequest);
    const test = {
      username: authRequest.username,
      password: authRequest.password
    }
    return this.http.post(this.host + "/authentication/authenticate", test, {observe: 'response'})
  }

  logout() {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('username');
    localStorage.removeItem('alias');
    localStorage.removeItem('compteBancaireId');
    localStorage.removeItem('role');

    console.log(localStorage.getItem('username'));
    const headers = {
      Authorization: 'Bearer ' + token, // Replace `token` with your actual bearer token value
    };


    //const options = { headers: headers };
    this.http.post(this.host + "/logout", null, {headers}).subscribe(
      response => {
        console.log(response)
        // Handle the response from the server
      },
      error => {
        console.log(error)

        // Handle any errors that occurred
      }
    );
    this.jwtToken = "";
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user')

  }


  saveToken(jwt: any) {
    if (jwt != null) {
      this.jwtToken = jwt;

      localStorage.setItem('token', jwt);

      this.role = this.helper.decodeToken(this.jwtToken).role;
      this.username = this.helper.decodeToken(this.jwtToken).sub;
      localStorage.setItem('username', this.username);
      console.log(localStorage.getItem('username'));
      let parametres = new HttpParams();
      parametres = parametres.append('username', this.username);

      this.http.get(`${this.host}/user/username/${this.username}`, {
        headers: {'Authorization': this.jwtToken}
      }).subscribe((data: any) => {
        //localStorage.setItem('userId', data.id);
        const user = JSON.stringify(data);
        const user1 = JSON.parse(user);
        localStorage.setItem('user', user1);

      });
    }
    throw new Error("token is null");
  }

  setUserinLocal() {
    const username1 = localStorage.getItem('username');
    if (username1) {
      const parametres = new HttpParams().append('username', username1);
      //return this.http.get(`${this.host}/role/${username1}`, { headers: new HttpHeaders({'Authorization': this.jwtToken}) });
      this.http.get<string>(`${this.host}/role/${username1}`, {headers: new HttpHeaders({'Authorization': this.jwtToken})})
        .subscribe((data: string) => {
          localStorage.setItem('userRole', data);
        });
    } else {
      // handle the case where the username is null
      throw new Error('Username not found in local storage');
    }
  }

  loadToken() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.jwtToken = token;
    } else {
      throw new Error('No token found in local storage');
    }
  }

  isLoginIn() {
    this.loadToken()
    if (this.jwtToken == null) {
      return false;
    }
    return true;
  }

  /*
  isAdmin(){
    if(this.helper.decodeToken(localStorage.getItem("token")).role=="ADMIN"){
      return true;
    }
    return false;
  }*/
  isAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      if (decodedToken?.role === '[ROLE_ADMIN]') {
        return true;
      }
    }
    return false;
  }
}
