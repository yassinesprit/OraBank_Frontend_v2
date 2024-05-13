import {Client} from "./Client";

export class Utilisateur {
  id!: number;

  username!: string;

  motDePasse!: string;

  email!: string;

  nom!: string;

  prenom!: string;

  telephone!: string;

  langue!: string;

  statut!: boolean;

  role!: String;

  client!: Client;


}
