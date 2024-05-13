import {Component, Input, OnInit} from '@angular/core';
import {SideBarService} from "../../../Services/SideBar/side-bar.service";
import {LoginService} from "../../../Services/Securité/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../../Services/User/user.service";
import {UserResponse} from "../../../Model/UserResponse";
import {Utilisateur} from "../../../Model/Utilisateur";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() curUser!:any;
  user!:Utilisateur
  Username:String=''
  constructor(private sidebarService: SideBarService,private loginService: LoginService,private router:Router,private userService:UserService) { }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    var username =localStorage.getItem('username');
    console.log(username);
    this.userService.loadUserByUsername(username).subscribe(
      result=>{
        this.user=result
      }
    )

  }
}
