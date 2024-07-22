import {Component, Inject, OnInit} from '@angular/core';
import {CompteBancaire} from "../../Model/CompteBancaire";
import {BankAccountService} from "../../Services/bank-account.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-details-ba',
  templateUrl: './details-ba.component.html',
  styleUrl: './details-ba.component.css'
})
export class DetailsBAComponent implements OnInit {
  compteBancaire!: CompteBancaire;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private b:BankAccountService) {}

  ngOnInit(): void {
    // You can perform any initialization tasks here
    this.b.findCompteById(Number(this.data)).subscribe(
      (data: CompteBancaire) => {
        this.compteBancaire = data;
      },
      (error) => {
        console.error('Error fetching compte bancaire data', error);
      }
    );
  }
}
