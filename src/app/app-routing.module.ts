import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminSideBarComponent} from "./Shared/admin-side-bar/admin-side-bar.component";
import {SideBarComponent} from "./Shared/side-bar/side-bar.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {BAChooseComponent} from "./BankAccount/ba-choose/ba-choose.component";
import {AliasDisplayComponent} from "./Alias/alias-display/alias-display.component";
import {AliasFormComponent} from "./Alias/alias-form/alias-form.component";
import {ListUsersComponent} from "./User/list-users/list-users.component";
import {TransferComponent} from "./Transactions/transfer/transfer.component";
import {TransactionsListComponent} from "./Transactions/transactions-list/transactions-list.component";
import {SendComponent} from "./Transactions/send/send.component";
import {ContactListComponent} from "./Contact/contact-list/contact-list.component";
import {ReceiveComponent} from "./Transactions/receive/receive.component";
import {DemandeListComponent} from "./Transactions/demande-list/demande-list.component";
import {ErrorComponent} from "./Shared/error/error.component";
import {DetailUserComponent} from "./User/detail-user/detail-user.component";
import {AuthGuard} from "./Security/auth.guard";
import {UnauthorizedComponent} from "./Shared/unauthorized/unauthorized.component";
import {DetailsBAComponent} from "./BankAccount/details-ba/details-ba.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: '', pathMatch:"full", redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: '403', component: UnauthorizedComponent},


  {
    path: 'admin',
    component: AdminSideBarComponent,
    // canActivate: [AuthGuard], // If AuthGuard should protect the sidenav routes
    children: [
      {path: 'users', component: ListUsersComponent , canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]']}},
      {path: 'detailUser', component: DetailUserComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'BAchoose', component: BAChooseComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'transfer', component: TransferComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'list-transfer', component: TransactionsListComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'send-form', component: SendComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'receive-form', component: ReceiveComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'list-demande', component: DemandeListComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'aliasform', component: AliasFormComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'alias/:id', component: AliasDisplayComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
      {path: 'list-contact', component: ContactListComponent, canActivate: [AuthGuard], data: { roles: ['[ROLE_Admin]','[ROLE_Utilisateur]']}},
    ]
  },
  /*{
    path: 'user',
    component: SideBarComponent,
    //canActivate: [AuthGuard], // If AuthGuard should protect the sidenav routes
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'BAchoose', component: BAChooseComponent},
      {path: 'BAdetails', component: DetailsBAComponent},
      {path: 'transfer', component: TransferComponent},
      {path: 'list-transfer', component: TransactionsListComponent},
      {path: 'send-form', component: SendComponent},
      {path: 'receive-form', component: ReceiveComponent},
      {path: 'list-demande', component: DemandeListComponent},
      {path: 'aliasform', component: AliasFormComponent},
      {path: 'alias/:id', component: AliasDisplayComponent},
      {path: 'list-contact', component: ContactListComponent}

      /!*{ path: 'schemas', component: SchemaListComponent, data: { roles: ['Admin'] } },*!/


    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
