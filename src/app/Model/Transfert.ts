import {Alias} from "./Alias";
import {Devise} from "./Devise";

export class Transfert {
  id!: number;
  reference!: string;
  description!: string;
  fraisDeTransaction!: number;
  montant!: number;
  date!: Date;
  typeTransfert!: string;
  statusTransfert!: string;
  frauduleux!:boolean;
}
