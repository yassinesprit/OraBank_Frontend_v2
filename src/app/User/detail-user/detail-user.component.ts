import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../Model/Utilisateur";
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent implements OnInit {
  user: Utilisateur | null = null;
  username = localStorage.getItem('username') ?? '';



  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    // Replace this with actual user fetching logic
    this.userService.loadUserByUsername(this.username).subscribe(
      (data: Utilisateur) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }
}
