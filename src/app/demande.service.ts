import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}


