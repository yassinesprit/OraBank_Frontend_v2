import {Component, Input, OnInit} from '@angular/core';
import {SideBarService} from "../../../Services/SideBar/side-bar.service";
import {LoginService} from "../../../Services/Securité/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../../Services/User/user.service";
import {Utilisateur} from "../../../Model/Utilisateur";
import {NotificationService} from "../../../Services/WebSocket/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() curUser!:any;
  user!:Utilisateur
  Username:String=''
  notifications: any[] = [];
  constructor(private sidebarService: SideBarService,private loginService: LoginService,private router:Router,private userService:UserService,private webSocketService: NotificationService) { }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    var username =localStorage.getItem('username');
    this.userService.loadUserByUsername(username).subscribe(
      result=>{
        this.user=result
      }
    )
    this.webSocketService.connect().subscribe(notifications => {
      this.notifications = notifications;
    });
  }
  iconClass(type: string): string {
    switch (type) {
      case 'warning':
        return 'bi bi-exclamation-circle text-warning';
      case 'danger':
        return 'bi bi-x-circle text-danger';
      case 'success':
        return 'bi bi-check-circle text-success';
      case 'info':
        return 'bi bi-info-circle text-primary';
      default:
        return 'bi bi-info-circle text-secondary';
    }
  }
}
