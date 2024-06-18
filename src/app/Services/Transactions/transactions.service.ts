import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transfert} from "../../Model/Transfert";
import {TransfertDto} from "../../Model/TransfertDto";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'http://localhost:9999/transfert';

  constructor(private http: HttpClient) {
  }

  createTransfert(transfertDto: TransfertDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, transfertDto);
  }

  retrieveTransfertByAlias(alias: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alias/${alias}`);
  }


}
