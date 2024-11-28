import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  getAllCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/candidates`);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, user);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  getCandidatId(): number | null {
    return this.getUserRoleId('candidatId');
  }

  private getUserRoleId(roleKey: string): number | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.[roleKey] || null;
    }
    return null;
  }
}
