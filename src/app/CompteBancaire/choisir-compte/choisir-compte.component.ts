import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CompteBancaire} from "../../Model/CompteBancaire";
import {CompteBancaireService} from "../../Services/CompteBancaire/compte-bancaire.service";

@Component({
  selector: 'app-choisir-compte',
  templateUrl: './choisir-compte.component.html',
  styleUrl: './choisir-compte.component.css'
})
export class ChoisirCompteComponent implements OnInit{
  list!:CompteBancaire[];


  constructor(private router: Router,
              private compteBancaire:CompteBancaireService,
){}
  ngOnInit(): void {
    this.compteBancaire.retrieveByUsername().subscribe((result) => {
      this.list=result;
    })

}
}
