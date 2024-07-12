import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionsService} from "../../Services/transactions.service";
import {Transfert} from "../../Model/Transfert";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent implements OnInit{
  displayedColumns: string[] = ['reference', 'description', 'montant', 'date', 'typeTransfert', 'statusTransfert'];
  dataSource = new MatTableDataSource<Transfert>();
  alias = localStorage.getItem('alias') ?? '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private transfertService: TransactionsService) {}

  ngOnInit(): void {
    this.transfertService.retrieveTransfertByAlias(this.alias).subscribe((transferts: Transfert[]) => {
      this.dataSource.data = transferts;
      this.dataSource.paginator = this.paginator;
    });
  }
}
