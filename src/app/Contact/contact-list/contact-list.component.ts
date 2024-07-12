import {Component, OnInit, ViewChild} from '@angular/core';
import {Contact} from "../../Model/Contact";
import {ContactService} from "../../Services/contact.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  dataSource = new MatTableDataSource<Contact>([]);
  displayedColumns: string[] = [ 'nom', 'compteBancaire', 'utilisateur'];
  username = localStorage.getItem('username') ?? '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
    this.dataSource.paginator = this.paginator;
  }

  getContacts(): void {

    this.contactService.getContactsByUsername(this.username).subscribe(
      (contacts) => {
        this.dataSource.data = contacts;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}
