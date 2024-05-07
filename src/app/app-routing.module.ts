import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DisplayAliasComponent} from "./Alias/display-alias/display-alias.component";
import {ChoisirCompteComponent} from "./CompteBancaire/choisir-compte/choisir-compte.component";

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
    path:"home",
    component:DisplayAliasComponent
  },
  {
    path:"monAlias/:id",
    component:DisplayAliasComponent
  },
  {
    path:"choisirCompte",
    component:ChoisirCompteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
