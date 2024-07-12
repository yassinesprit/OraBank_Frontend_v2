export class ContactDto {
  nom: string;
  numeroCompte: string;
  username: string;

  constructor(
    nom: string,
    numeroCompte: string,
    username: string
  ){
  this.nom = nom
  this.numeroCompte = numeroCompte
  this.username = username

}
}
