import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../Services/Transactions/transactions.service";
import {Transfert} from "../Model/Transfert";
import {CompteBancaireService} from "../Services/CompteBancaire/compte-bancaire.service";
import {CompteBancaire} from "../Model/CompteBancaire";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  alias: string = localStorage.getItem('alias') ?? ''; // Provide an empty string as the default value
  compteId: any = localStorage.getItem('compteBancaireId') ?? ''; // Provide an empty string as the default value
  compte!:CompteBancaire;
  transferts!: Transfert[];

  constructor(private transfertService: TransactionsService,private compteBancaireService:CompteBancaireService) {
  }

  ngOnInit(): void {

      this.transfertService.retrieveTransfertByAlias(this.alias).subscribe(
        (transfert) => {
          this.transferts = transfert;
        },
        (error) => {
          console.error('Erreur lors de la récupération du transfert', error);
        }
      );

    this.compteId = Number(localStorage.getItem('compteBancaireId') ?? '0');
    this.compteBancaireService.findCompteById(this.compteId).subscribe(
      (response) => {
        this.compte = response;
      },
      (error) => {
        console.error('Error loading compte:', error);
      }
    );
    }



}
