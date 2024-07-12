import {Component, OnInit} from '@angular/core';
import {DemandePaiement} from "../../Model/DemandePaiement";
import {DemandeService} from "../../Services/demande.service";

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.css'
})
export class DemandeListComponent implements OnInit{
  demandeDestinataire: DemandePaiement[] = [];
  demandeExpediteur: DemandePaiement[] = [];
  alias: string = localStorage.getItem('alias') ?? '';
  showSent: boolean = true;
  displayedColumns: string[] = ['id', 'montant', 'description', 'dateCreation'];

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(): void {
    this.demandeService.getAllDemandeByAliasExpediteur(this.alias).subscribe(
      data => this.demandeExpediteur = data,
      error => console.error('Error fetching demandes', error)
    );

    this.demandeService.getAllDemandeByAliasDestinataire(this.alias).subscribe(
      data => this.demandeDestinataire = data,
      error => console.error('Error fetching demandes', error)
    );
  }

  toggleView(): void {
    this.showSent = !this.showSent;
  }
}
