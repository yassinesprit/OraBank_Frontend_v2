import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../../Model/Client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private host:string="http://localhost:9999/client";

  constructor(private http:HttpClient) { }

  retrieveByUsername(): Observable<any> {
    var username = localStorage.getItem('username');
    const url = `/username/${username}`;
    return this.http.get<Client>(`${this.host}/username/${username}`);
  }
}
