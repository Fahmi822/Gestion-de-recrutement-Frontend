import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from './models/Demande';
import {DemandeWithEntretien} from './models/DemandeWithEntretien';

@Injectable({
  providedIn: 'root',
})
export class DemandeService {
  private baseUrl = 'http://localhost:8085/api/demandes';

  constructor(private http: HttpClient) {}

  postulerDemande(demande: any): Observable<any> {
    const formData = new FormData();

    // Ajouter les données textuelles
    formData.append('candidatId', demande.candidatId);
    formData.append('offreId', demande.offreId);
    formData.append('email', demande.email);

    // Ajouter les fichiers
    if (demande.cv) formData.append('cv', demande.cv);
    if (demande.lettreMotivation) formData.append('lettreMotivation', demande.lettreMotivation);
    if (demande.diplome) formData.append('diplome', demande.diplome);

    return this.http.post(`${this.baseUrl}/postuler`, formData);
  }
 
  getDemandesByOffre(offreId: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.baseUrl}/${offreId}/demandes`);
  }
  
  acceptDemande(demandeId: number): Observable<Demande> {
    return this.http.post<Demande>(`${this.baseUrl}/${demandeId}/accepter`, {});  // Le corps de la requête peut être vide
  }
  refuserDemande(demandeId: number): Observable<Demande> {
    return this.http.post<Demande>(`${this.baseUrl}/${demandeId}/refuser`, {});  // Requête POST pour refuser la demande
  }
  getAcceptedDemandesWithEntretiens(): Observable<DemandeWithEntretien[]> {
    return this.http.get<any[]>(`${this.baseUrl}/accepted-entretien`);
  }
  
}


