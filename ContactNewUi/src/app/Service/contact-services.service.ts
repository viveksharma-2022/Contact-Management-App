import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContacts } from '../Models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactServicesService {

  private apiUrl = 'https://localhost:7250/api/Contacts'; 
  constructor(private http:HttpClient) {

   }

  getContacts(): Observable<IContacts[]> {
    return this.http.get<IContacts[]>(this.apiUrl);
  }
  createContact(contact: IContacts[]): Observable<any> {
    console.log('Creating contact:', contact);
    return this.http.post(this.apiUrl, contact);
  }

  getContactById(contactId: number): Observable<IContacts> {
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.get<IContacts>(url);
  }

  updateContact(contactId: number, contact: IContacts): Observable<IContacts> {
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.put<IContacts>(url, contact);
  }

  deleteContact(contactId: number): Observable<any> {
    const url = `${this.apiUrl}/${contactId}`;
    return this.http.delete(url);
  }
}
