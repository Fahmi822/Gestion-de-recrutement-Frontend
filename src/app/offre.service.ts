import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private baseUrl = 'http://localhost:8085/api/offres'; // Update with your backend endpoint

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/toutes`);
  }

  addOffer(offer: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ajouter`, offer);
  }

  updateOffer(id: number, offer: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifier/${id}`, offer);
  }

  deleteOffer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/supprimer/${id}`);
  }
}
