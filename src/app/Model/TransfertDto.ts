export class TransfertDto {
  reference!: string;
  description!: string;
  montant!: number;
  idDevise!: number;
  destinataireAlias!: string|null;
  expediteurAlias!: string;
  typeTransfert!: string ;
  statusTransfert!: string ;
  nomBanque!: string|null;
  paysBanque!: string|null;
  referenceBanque!: string|null;
  nomInstitutFin!: string|null;

  constructor(
    reference: string,
    description: string,
    montant: number,
    idDevise: number,
    destinataireAlias: string|null,
    expediteurAlias: string,
    typeTransfert: string,
    statusTransfert: string,
    nomBanque: string|null,
    paysBanque: string|null,
    referenceBanque: string|null,
    nomInstitutFin: string|null

  ) {
    this.reference = reference
    this.description = description
    this.montant = montant
    this.idDevise = idDevise
    this.destinataireAlias = destinataireAlias
    this.expediteurAlias = expediteurAlias
    this.typeTransfert = typeTransfert
    this.statusTransfert = statusTransfert
    this.nomBanque = nomBanque
    this.paysBanque = paysBanque
    this.referenceBanque = referenceBanque
    this.nomInstitutFin = nomInstitutFin
  }

}

