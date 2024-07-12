import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompteBancaire} from "../Model/CompteBancaire";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private host: string = "http://localhost:9999/comptebancaire";

  constructor(private http: HttpClient) {
  }


  retrieveByUsername(): Observable<any> {
    var username = localStorage.getItem('username');
    return this.http.get<CompteBancaire>(`${this.host}/username/${username}`);
  }

  retrieveFreeByUsername(): Observable<any> {
    var username = localStorage.getItem('username');
    return this.http.get<CompteBancaire>(`${this.host}/free/username/${username}`);
  }

  findCompteById(compteId: number): Observable<any> {
    const url = `${this.host}/${compteId}`;
    return this.http.get(url);
  }
}
