import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  role = localStorage.getItem('role') ?? '';

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

  redirectToAlias() {
    const alias = localStorage.getItem('alias');
    const compteBancaireId = localStorage.getItem('compteBancaireId');


    if (alias) {
      this.router.navigateByUrl('/admin/alias/' + compteBancaireId);
    } else {
      this.router.navigateByUrl('/admin/BAchoose');

    }
  }

  redirectToTransfert() {
    const alias = localStorage.getItem('alias');
    const compteBancaireId = localStorage.getItem('compteBancaireId');

    if (alias) {
      this.router.navigateByUrl('/admin/transfer');
    } else {
      this.router.navigateByUrl('/admin/BAchoose');
    }
  }
}
