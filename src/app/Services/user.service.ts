import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Utilisateur} from "../Model/Utilisateur";
import {UserResponse} from "../Model/UserResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host:string="http://localhost:9999/user";



  constructor(private http:HttpClient) { }

  retrieveUsers(): Observable<Utilisateur[]> {
    //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.get<Utilisateur[]>(`${this.host}`);
  }

  getUserRoleByUsername(username:string) :Observable<UserResponse>{
    return this.http.get<UserResponse>(`${this.host}/role/${username}`);
  }

  retrieveUserById(id:number):Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.host}/${id}`);
  }
  loadUserByUsername(username:any):Observable<Utilisateur> {
    console.log(username)
    return this.http.get<Utilisateur>(`${this.host}/username/${username}`);
  }

  /*save(user:UserDto) {
    return this.http.post<UserResponse>(`${this.host}/`, user,{observe:'response'})
  }*/


  currentUser():Observable<Utilisateur>{
    const token = localStorage.getItem('token');
    if (token==null){
      throw new Error("no current user");
    }
    const helper = new JwtHelperService();
    const usern= helper.decodeToken(token).sub;

    console.log(usern);

    return this.loadUserByUsername(usern);
  }
}
