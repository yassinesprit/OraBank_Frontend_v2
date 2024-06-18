import {Component, OnInit} from '@angular/core';
import {SideBarService} from "../../../Services/SideBar/side-bar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  sidebarVisible: boolean = true; // Initially visible
  id:any;

  constructor(private sidebarService: SideBarService , private router:Router) {
    this.sidebarService.sidebarVisible$.subscribe(visible => this.sidebarVisible = visible);
    this.id = localStorage.getItem('compteBancaireId');

  }

  ngOnInit(): void {
  }

  goToMonAlias() {
    if (this.id) {
      this.router.navigate(['/monAlias/'+this.id]);
    } else {
      // Handle the case when the id is null or undefined
      console.error('Invalid id value');
    }
  }


}
