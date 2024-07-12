import {Alias} from "./Alias";

export class DemandePaiement {
  id!: number;
  montant!: number;
  dateCreation!: Date;
  description!: string;
  destinataire!: Alias;
  expediteur!: Alias;
}

