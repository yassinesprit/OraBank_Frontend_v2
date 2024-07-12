import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../Model/Contact";
import {ContactDto} from "../Model/ContactDto";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:9999/contacts'; // Update to your actual backend URL

  constructor(private http: HttpClient) {}

  getContactsByUsername(username: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/utilisateur/${username}`);
  }

  createContact(contact: ContactDto): Observable<ContactDto> {
    return this.http.post<ContactDto>(this.apiUrl, contact);
  }

}
