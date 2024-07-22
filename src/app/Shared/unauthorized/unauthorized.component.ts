import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  role = localStorage.getItem('role') ?? '';

  constructor(private router: Router) {}

  redirectToHome() {
      this.router.navigateByUrl('/admin/home');

  }
}
