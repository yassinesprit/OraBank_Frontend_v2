import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../Services/user.service";
import {UserResponse} from "../../Model/UserResponse";
import {Utilisateur} from "../../Model/Utilisateur";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'nom', 'prenom', 'telephone', 'langue', 'statut', 'role'];
  dataSource = new MatTableDataSource<Utilisateur>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.retrieveUsers().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
