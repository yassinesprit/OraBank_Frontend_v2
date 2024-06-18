export class Alias {
  id!: number;
  alias!: string;
  description!: string;
  dateDeCreation!: Date;
  statut!: boolean;
  type!: string;
  username!:string;
  telephone!:string;
  compteBancaireId!:number;

  constructor(
    description: string,
    type: string,
    username: string,
    compteBancaireId:number,
    telephone:string


) {
    this.description = description;
    this.type = type;
    this.username = username
    this.compteBancaireId=compteBancaireId
    this.telephone=telephone
  }
}
