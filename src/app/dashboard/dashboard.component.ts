import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionsService} from "../Services/transactions.service";
import {ContactService} from "../Services/contact.service";
import {NgForm} from "@angular/forms";
import {TransfertDto} from "../Model/TransfertDto";
import Swal from "sweetalert2";
import {ContactDto} from "../Model/ContactDto";
import {DemandePaiement} from "../Model/DemandePaiement";
import {DemandeService} from "../Services/demande.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
  }


}
