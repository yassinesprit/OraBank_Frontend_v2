import {Injectable} from '@angular/core';
import {DemandeDto} from "../Model/DemandeDto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DemandePaiement} from "../Model/DemandePaiement";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = 'http://localhost:9999/demandes'; // Adjust this URL to your API endpoint

  constructor(private http: HttpClient) {
  }

  createDemande(demande: DemandeDto): Observable<DemandeDto> {
    return this.http.post<DemandeDto>(this.apiUrl, demande);
  }

  getAllDemandeByAliasDestinataire(alias: string): Observable<DemandePaiement[]> {
    return this.http.get<DemandePaiement[]>(`${this.apiUrl}/destinataire/${alias}`);
  }

  getAllDemandeByAliasExpediteur(alias: string): Observable<DemandePaiement[]> {
    return this.http.get<DemandePaiement[]>(`${this.apiUrl}/expediteur/${alias}`);
  }
}
