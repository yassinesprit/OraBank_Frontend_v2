import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../Model/Utilisateur";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../Security/Services/login.service";
import {Router} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {NotificationService} from "../../Services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {BankAccountService} from "../../Services/bank-account.service";
import {CompteBancaire} from "../../Model/CompteBancaire";
import {DetailsBAComponent} from "../../BankAccount/details-ba/details-ba.component";
import {Alias} from "../../Model/Alias";
import {AliasDisplayComponent} from "../../Alias/alias-display/alias-display.component";
import {AliasService} from "../../Services/alias.service";
import {ContactFormComponent} from "../../Contact/contact-form/contact-form.component";

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent implements OnInit {
  user!: Utilisateur
  notificationCount: number = 0;
  notifications: any[] = [];
  compteBancaire: CompteBancaire | null = null;
  compteBancaireId :any;
  role = localStorage.getItem('role') ?? '';

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router,
              private userService: UserService, private webSocketService: NotificationService,
              private compteBancaireService: BankAccountService, private aliasService: AliasService,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    console.log(this.compteBancaireId)
    this.getCompteBancaire();
    this.notificationCount = 0;
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
  getCompteBancaire(): void {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    // Replace this with actual fetching logic
    this.compteBancaireService.findCompteById(Number(this.compteBancaireId)).subscribe(
      (data: CompteBancaire) => {
        this.compteBancaire = data;
      },
      (error) => {
        console.error('Error fetching compte bancaire data', error);
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
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
            this.notifications = [];
            this.notificationCount = 0;
          },
          error => {
            console.error('Error marking notification as read:', error);
            // Handle error, revert changes, or show error message
          }
        );
      }
    });
  }

  openDetailsDialog(): void {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const dialogRef = this.dialog.open(DetailsBAComponent, {
      width: '400px',
      data: this.compteBancaireId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openContactDialog() {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '400px', // Adjust width as per your design
      disableClose: true // Prevent closing dialog by clicking outside or pressing ESC key
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Add any post-dialog-closed logic here if needed
    });
  }

  navigateToAliasDetails() {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const alias = localStorage.getItem('alias');
    console.log(this.compteBancaireId)
    console.log(alias)
    if (!alias) {
        this.router.navigateByUrl('/admin/BAchoose');
    } else {
        this.router.navigateByUrl('/admin/alias/'+this.compteBancaireId);
    }
  }
  navigateToAliasTransactions() {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const alias = localStorage.getItem('alias');
    console.log(this.compteBancaireId)
    console.log(alias)
    if (!alias) {
        this.router.navigateByUrl('/admin/BAchoose');
    } else {
        this.router.navigateByUrl('/admin/transfer');
    }
  }
  navigateToAliasTransferer() {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const alias = localStorage.getItem('alias');
    console.log(this.compteBancaireId)
    console.log(alias)
    if (!alias) {
        this.router.navigateByUrl('/admin/BAchoose');

    } else {
        this.router.navigateByUrl('/admin/send-form');
    }
  }
  navigateToAliasRecevoir() {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const alias = localStorage.getItem('alias');
    console.log(this.compteBancaireId)
    console.log(alias)
    if (!alias) {
        this.router.navigateByUrl('/admin/BAchoose');
    } else {
        this.router.navigateByUrl('/admin/receive-form');
    }
  }
  navigateToAliasListTransfert() {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const alias = localStorage.getItem('alias');
    console.log(this.compteBancaireId)
    console.log(alias)
    if (!alias) {
        this.router.navigateByUrl('/admin/BAchoose');
    } else {
        this.router.navigateByUrl('/admin/list-transfer');
    }
  }
  navigateToAliasListDemandes() {
    this.compteBancaireId= localStorage.getItem('compteBancaireId') ?? ''
    const alias = localStorage.getItem('alias');
    console.log(this.compteBancaireId)
    console.log(alias)
    if (!alias) {
        this.router.navigateByUrl('/admin/BAchoose');
    } else {
        this.router.navigateByUrl('/admin/list-demande');
    }
  }

}
