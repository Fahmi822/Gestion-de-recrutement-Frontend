import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


const BASE_URL = 'http://localhost:8085/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private http: HttpClient) {}

  signup(signRequest: any): Observable<any> {
    return this.http.post(`${BASE_URL}signup`, signRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${BASE_URL}login`, loginRequest).pipe(
      tap((response: any) => {
        this.saveTokenAndRole(response.token, response.role);
        if (response.utilisateurId) {
          localStorage.setItem('utilisateurId', response.utilisateurId.toString());
        }
      })
    );
  }
  saveTokenAndRole(token: string, role: string): void {
    localStorage.setItem('jwt', token);
    localStorage.setItem('role', role);
  }
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload); 
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }
  getUtilisateurId(): number | null {
    const utilisateurId = localStorage.getItem('utilisateurId');
    return utilisateurId ? Number(utilisateurId) : null;
  }
}  
