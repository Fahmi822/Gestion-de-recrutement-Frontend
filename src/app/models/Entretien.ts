export interface Entretien {
    id: number;
    demandeId: number;  // L'ID de la demande associée
    dateEntretien: Date;
    status: string;  // Statut de l'entretien
  }