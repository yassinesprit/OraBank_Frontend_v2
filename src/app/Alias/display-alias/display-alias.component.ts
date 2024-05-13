import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Alias} from "../../Model/Alias";
import {AliasService} from "../../Services/Alias/alias.service";

@Component({
  selector: 'app-display-alias',
  templateUrl: './display-alias.component.html',
  styleUrl: './display-alias.component.css'
})
export class DisplayAliasComponent implements OnInit{
  id:any;
  alias!:Alias;
  myAlias!:string;
  showCopiedNotification: boolean = false;

  constructor(private ac:ActivatedRoute,private aliasService:AliasService) { }

  ngOnInit(): void {
    //console.log(this.ac.snapshot.params['id']);//send request to db
    this.id=this.ac.snapshot.params['id'];
    console.log(this.id);
    this.aliasService.retrieveByComptebancaire(this.id).subscribe(
      result=>{
        this.alias=result;
        this.myAlias=this.alias.alias.toString();
        console.log(this.myAlias)
        localStorage.setItem('compteBancaireId',this.id);
        localStorage.setItem('alias',this.myAlias.toString());
      }
    )
  }
  showNotification() {
    this.showCopiedNotification = true;
    setTimeout(() => {
      this.showCopiedNotification = false;
    }, 2000); // Hide the notification after 2 seconds (adjust the duration as needed)
  }
}
