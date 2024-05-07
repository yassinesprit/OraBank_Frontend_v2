import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../Model/Client";
import {CompteBancaire} from "../../Model/CompteBancaire";

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {

  private host:string="http://localhost:9999/comptebancaire";

  constructor(private http:HttpClient) { }


  retrieveByUsername(): Observable<any> {
    var username = localStorage.getItem('username');
    const url = `/username/${username}`;
    return this.http.get<CompteBancaire>(`${this.host}/username/${username}`);
  }
}