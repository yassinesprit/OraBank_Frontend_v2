import {Component, OnInit} from '@angular/core';
import {CompteBancaire} from "../../Model/CompteBancaire";
import {Transfert} from "../../Model/Transfert";
import {BankAccountService} from "../../Services/bank-account.service";
import {TransactionsService} from "../../Services/transactions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  alias: string = localStorage.getItem('alias') ?? ''; // Provide an empty string as the default value
  compteId: any = localStorage.getItem('compteBancaireId') ?? ''; // Provide an empty string as the default value
  compte!: CompteBancaire;
  transferts!: Transfert[];
  role = localStorage.getItem('role') ?? '';


  constructor(private router: Router, private transfertService: TransactionsService, private compteBancaireService: BankAccountService) {
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

  navigateToSend() {
    if (this.role === "[ROLE_Admin]") {
      this.router.navigate(['/admin/send-form']);
    } else {
      this.router.navigate(['/user/send-form']);
    }
  }

  navigateToReceive() {
    if (this.role === "[ROLE_Admin]") {
      this.router.navigate(['/admin/receive-form']);
    } else {
      this.router.navigate(['/user/receive-form']);
    }
  }

  navigateToDetailsTransfer() {
    if (this.role === "[ROLE_Admin]") {
      this.router.navigate(['/admin/list-transfer']);
    } else {
      this.router.navigate(['/user/list-transfer']);
    }
  }
  navigateToDetailsDemande() {
    if (this.role === "[ROLE_Admin]") {
      this.router.navigate(['/admin/list-demande']);
    } else {
      this.router.navigate(['/user/list-demande']);
    }
  }
}
