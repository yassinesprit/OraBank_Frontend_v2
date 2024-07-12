import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../Model/Utilisateur";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../Security/Services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {NotificationService} from "../../Services/notification.service";

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent implements OnInit {
  user!: Utilisateur
  notificationCount: number = 0;
  notifications: any[] = [];
  compteBancaireId = localStorage.getItem('compteBancaireId') ?? '';

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router,
              private userService: UserService, private webSocketService: NotificationService,) {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.notificationCount=0;
    console.log(this.notificationCount);
    const username = localStorage.getItem('username');
    const alias = localStorage.getItem('alias');

    if (username) {
      this.userService.loadUserByUsername(username).subscribe(
        result => {
          this.user = result;
        }
      );
    }

    if (alias) {
      this.fetchUnreadNotifications(alias);
      this.webSocketService.getNotifications().subscribe((notification) => {
        // Assuming the notification is already an object, otherwise parse it if needed
        this.notifications.push(notification);
        this.notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.notificationCount = this.notifications.filter(n => !n.is_read).length;
      });
    }
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

  fetchUnreadNotifications(alias: string) {
    this.http.get<any[]>(`http://localhost:9999/notifications/unread/${alias}`).subscribe((notifications) => {
      this.notifications = notifications;
      this.notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.notificationCount = this.notifications.length;
    });
  }
  markNotificationsAsRead() {
    this.notifications.forEach(notification => {
      if (!notification.is_read) {
        notification.is_read = true;
        this.http.post<any>(`http://localhost:9999/notifications/markread/${notification.id}`, null).subscribe(
          updatedNotification => {
            console.log('Notification marked as read:', updatedNotification);
            // Optionally update the notification in the array if needed
            this.notifications=[];
            this.notificationCount=0;
          },
          error => {
            console.error('Error marking notification as read:', error);
            // Handle error, revert changes, or show error message
          }
        );
      }
    });
  }

}
