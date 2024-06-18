import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompteBancaire} from "../../Model/CompteBancaire";
import {Alias} from "../../Model/Alias";

@Injectable({
  providedIn: 'root'
})
export class AliasService {

  private host:string="http://localhost:9999/alias";
  constructor(private http:HttpClient) { }

  retrieveByComptebancaire(id:any): Observable<any> {
    return this.http.get<Alias>(`${this.host}/comptebancaire/${id}`);
  }

  createAlias(alias: any): Observable<any> {
    return this.http.post(this.host, alias);
  }
}
