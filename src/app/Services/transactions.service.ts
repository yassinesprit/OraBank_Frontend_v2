import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TransfertDto} from "../Model/TransfertDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'http://localhost:9999/transfert';

  constructor(private http: HttpClient) {
  }

  createTransfert(transfertDto: TransfertDto) {
    return this.http.post<any>(this.apiUrl, transfertDto, {observe: 'response'});
  }

  retrieveTransfertByAlias(alias: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alias/${alias}`);
  }
}
