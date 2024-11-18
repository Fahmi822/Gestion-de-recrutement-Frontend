import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'http://localhost:8085/api'; // Backend API URL

  constructor(private http: HttpClient) { }

  // Fetch all candidates
  getAllCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/candidats`);
  }
  getTotalCandidates(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getNumberOfMen(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/men`);
  }

  getNumberOfWomen(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count/women`);
  }
}
