import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../../Services/Transactions/transactions.service";
import {TransfertDto} from "../../Model/TransfertDto";

@Component({
  selector: 'app-transferer',
  templateUrl: './transferer.component.html',
  styleUrl: './transferer.component.css'
})
export class TransfererComponent implements OnInit {
  aliasValue: any;
  noteValue: any;
  montane: any;

  noteIbanValue: any;
  montantValue: any;
  nomValue: any;
  paysValue: any;
  ibanValue: any;

  compteValue: any;
  paysAutreValue: any;
  nomIfValue: any;
  montantAutreValue: any;
  noteAutreValue: any;


  nomPrenomValue: any;
  numCompteValue: any;

  statusTransfert: string = 'Sortant';  // Set as needed
  alias = localStorage.getItem('alias') ?? '';

  ngOnInit(): void {
  }

  constructor(private transactionsService: TransactionsService) {
  }

  onSubmitParAlias(): void {
    const transfertDto = new TransfertDto(
      'some-reference',
      this.noteValue,
      this.montane,
      1,
      this.aliasValue,
      this.alias,
      'ParAlias',
      this.statusTransfert,
      null,
      null,
      null,
      null
    );

    this.transactionsService.createTransfert(transfertDto).subscribe(response => {
      console.log('Transfert created successfully', response);
    }, error => {
      console.error('Error creating transfert', error);
    });
  }

  onSubmitParIban(): void {
    const transfertDto = new TransfertDto(
      'some-reference',
      this.noteIbanValue,
      this.montantValue,
      1,
      null,
      this.alias,
      'ParIBAN',
      this.statusTransfert,
      this.nomValue,
      this.paysValue,
      this.ibanValue,
      null
    );

    this.transactionsService.createTransfert(transfertDto).subscribe(response => {
      console.log('Transfert created successfully', response);
    }, error => {
      console.error('Error creating transfert', error);
    });
  }
  onSubmitParAutre(): void {
    const transfertDto = new TransfertDto(
      'some-reference',
      this.noteAutreValue,
      this.montantAutreValue,
      1,
      null,
      this.alias,
      'ParAutreCompte',
      this.statusTransfert,
      null,
      this.paysAutreValue,
      null,
      this.nomIfValue
    );

    this.transactionsService.createTransfert(transfertDto).subscribe(response => {
      console.log('Transfert created successfully', response);
    }, error => {
      console.error('Error creating transfert', error);
    });
  }
}
