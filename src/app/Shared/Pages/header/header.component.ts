import {Component, Input} from '@angular/core';
import {SideBarService} from "../../../Services/SideBar/side-bar.service";
import {LoginService} from "../../../Services/Securité/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() curUser!:any;

  constructor(private sidebarService: SideBarService,private loginService: LoginService,private router:Router) { }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
