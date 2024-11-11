import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8085/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient) {}

  signup(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest); 
  }
  
  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest);
  }

  saveTokenAndRole(token: string, role: string): void {
    localStorage.setItem('jwt', token);
    localStorage.setItem('role', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
