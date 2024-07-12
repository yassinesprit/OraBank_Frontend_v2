import {Component, OnInit} from '@angular/core';
import {Alias} from "../../Model/Alias";
import {ActivatedRoute, Router} from "@angular/router";
import {AliasService} from "../../Services/alias.service";

@Component({
  selector: 'app-alias-display',
  templateUrl: './alias-display.component.html',
  styleUrl: './alias-display.component.css'
})
export class AliasDisplayComponent implements OnInit{
  id:any;
  alias!:Alias;
  myAlias!:string;
  showCopiedNotification: boolean = false;
  role = localStorage.getItem('role') ?? '';


  constructor(private router: Router,private ac:ActivatedRoute,private aliasService:AliasService) { }

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

  navigateToBAchoose() {
    if (this.role === "[ROLE_Admin]") {
      this.router.navigateByUrl('/admin/BAchoose');
    } else {
      this.router.navigateByUrl('/user/BAchoose');
    }
  }
}
