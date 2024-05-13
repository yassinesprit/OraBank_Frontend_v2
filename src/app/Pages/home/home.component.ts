import {Component, OnInit} from '@angular/core';
import {AliasService} from "../../Services/Alias/alias.service";
import {Router} from "@angular/router";
import {Alias} from "../../Model/Alias";
import {CompteBancaireService} from "../../Services/CompteBancaire/compte-bancaire.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router) {}


  ngOnInit(): void {
  }
  redirectToAlias() {
    const alias = localStorage.getItem('alias');
    const compteBancaireId = localStorage.getItem('compteBancaireId');

    if (alias) {
      this.router.navigateByUrl('/monAlias/'+compteBancaireId);
    } else {
      this.router.navigateByUrl('/choisirCompte');
    }
  }
  redirectToTransfert() {
    const alias = localStorage.getItem('alias');
    const compteBancaireId = localStorage.getItem('compteBancaireId');

    if (alias) {
      this.router.navigateByUrl('/transaction');
    } else {
      this.router.navigateByUrl('/choisirCompte');
    }
  }
}
