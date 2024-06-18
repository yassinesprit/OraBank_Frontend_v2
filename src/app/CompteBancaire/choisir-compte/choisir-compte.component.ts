import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CompteBancaire} from "../../Model/CompteBancaire";
import {CompteBancaireService} from "../../Services/CompteBancaire/compte-bancaire.service";
import {AliasService} from "../../Services/Alias/alias.service";
import {Alias} from "../../Model/Alias";
import Swal from "sweetalert2";

@Component({
  selector: 'app-choisir-compte',
  templateUrl: './choisir-compte.component.html',
  styleUrl: './choisir-compte.component.css'
})
export class ChoisirCompteComponent implements OnInit{
  list!:CompteBancaire[];
  alias!:Alias;


  constructor(private router: Router,
              private compteBancaire:CompteBancaireService,
              private aliasService:AliasService
){}
  ngOnInit(): void {
    this.compteBancaire.retrieveByUsername().subscribe((result) => {
      this.list=result;
    })

}
//[routerLink]="['/monAlias/',item.id]"
redirectAfterVarif(id:any){
  this.aliasService.retrieveByComptebancaire(id).subscribe(
    result=>{
    console.log(id)
    this.router.navigate(['/monAlias/'+id]);
  }
    , error => {
      console.error(error);
      if (error.status === 500) {
        this.router.navigate(['/creerAlias']);
      };
    }

  )
}
}
