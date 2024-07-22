import {Component, OnInit, ViewChild} from '@angular/core';
import {DemandePaiement} from "../../Model/DemandePaiement";
import {DemandeService} from "../../Services/demande.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrl: './demande-list.component.css'
})
export class DemandeListComponent implements OnInit{
  demandeDestinataire: MatTableDataSource<DemandePaiement> = new MatTableDataSource();
  demandeExpediteur: MatTableDataSource<DemandePaiement> = new MatTableDataSource();
  alias: string = localStorage.getItem('alias') ?? '';
  showSent: boolean = true;
  displayedColumns: string[] = ['montant', 'description', 'dateCreation'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.fetchDemandes();
  }
  fetchDemandes(): void {
    this.demandeService.getAllDemandeByAliasExpediteur(this.alias).subscribe(
      data => {
        this.demandeExpediteur.data = data;
        this.demandeExpediteur.paginator = this.paginator;
      },
      error => console.error('Error fetching demandes', error)
    );

    this.demandeService.getAllDemandeByAliasDestinataire(this.alias).subscribe(
      data => {
        this.demandeDestinataire.data = data;
        this.demandeDestinataire.paginator = this.paginator;
      },
      error => console.error('Error fetching demandes', error)
    );
  }

  toggleView(): void {
    console.log("gelllooo")
    this.showSent = !this.showSent;
    console.log(this.showSent)
  }
}
