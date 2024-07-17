import {Component, OnInit} from '@angular/core';
import {CompteBancaire} from "../../Model/CompteBancaire";
import {Alias} from "../../Model/Alias";
import {Router} from "@angular/router";
import {BankAccountService} from "../../Services/bank-account.service";
import {AliasService} from "../../Services/alias.service";

@Component({
  selector: 'app-ba-choose',
  templateUrl: './ba-choose.component.html',
  styleUrl: './ba-choose.component.css'
})
export class BAChooseComponent implements OnInit {
  list!: CompteBancaire[];
  alias!: Alias;
  role = localStorage.getItem('role') ?? '';


  constructor(private router: Router,
              private compteBancaire: BankAccountService,
              private aliasService: AliasService
  ) {
  }

  ngOnInit(): void {
    this.compteBancaire.retrieveByUsername().subscribe((result) => {
      this.list = result;
    })

  }

//[routerLink]="['/monAlias/',item.id]"
  redirectAfterVarif(id: any) {
    this.aliasService.retrieveByComptebancaire(id).subscribe(
      result => {
        console.log(id)
        localStorage.setItem("compteBancaireId",id);
        if (this.role === "[ROLE_Admin]") {
          this.router.navigate(['/admin/alias/' + id]);
        } else {
          this.router.navigate(['/user/alias/' + id]);
        }
      }
      , error => {
        console.error(error);
        if (error.status === 500) {
          localStorage.setItem("compteBancaireId",id);
          if (this.role === "[ROLE_Admin]") {
            this.router.navigate(['/admin/aliasform']);
          } else {
            this.router.navigate(['/user/aliasform']);
          }
        }
      }
    )
  }
}
