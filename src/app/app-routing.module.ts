import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DisplayAliasComponent} from "./Alias/display-alias/display-alias.component";
import {ChoisirCompteComponent} from "./CompteBancaire/choisir-compte/choisir-compte.component";
import {AliasFormComponent} from "./Alias/alias-form/alias-form.component";
import {HomeComponent} from "./Pages/home/home.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {TransfererComponent} from "./transaction/transferer/transferer.component";

const routes: Routes = [
  { path: '',
  pathMatch:"full",
  redirectTo: 'login'
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"monAlias/:id",
    component:DisplayAliasComponent
  },
  {
    path:"choisirCompte",
    component:ChoisirCompteComponent
  },
  {
    path:"creerAlias",
    component:AliasFormComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"transaction",
    component:TransactionComponent
  },
  {
    path:"transferer",
    component:TransfererComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
