export class DemandeDto {
  montant: number;
  aliasExp: string;
  aliasDest: string;
  description: string;

  constructor(
    montant: number,
    aliasExp: string,
    aliasDest: string,
    description: string
  ) {
    this.montant = montant
    this.aliasExp = aliasExp
    this.aliasDest = aliasDest
    this.description = description
  }
}
