import {CompteBancaire} from "./CompteBancaire";
import {Utilisateur} from "./Utilisateur";

export class Contact {
  id!: number;
  nom!: string;
  compteBancaire!: CompteBancaire
  utilisateur!: Utilisateur
}
