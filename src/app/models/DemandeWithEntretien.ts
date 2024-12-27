import { Demande } from './Demande';
import { Entretien } from'./Entretien';
export interface  DemandeWithEntretien {
  email: string;
  dateEntretien: string;  // ou Date si vous gérez la conversion
  status: string;
  post: string;
}
