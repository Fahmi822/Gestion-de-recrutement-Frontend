export interface Demande {
  id: number;
  date: Date;
  email: string;
  cvUrl?: string;
  cv:string
  diplome:string
  lettreMotivation:string
  lettreMotivationUrl?: string;
  diplomeUrl?: string;
  status: string;
}
