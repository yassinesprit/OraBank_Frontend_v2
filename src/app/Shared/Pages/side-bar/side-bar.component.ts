import { Component } from '@angular/core';
import {SideBarService} from "../../../Services/SideBar/side-bar.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  sidebarVisible: boolean = true; // Initially visible

  constructor(private sidebarService: SideBarService) {
    this.sidebarService.sidebarVisible$.subscribe(visible => this.sidebarVisible = visible);
  }
}
