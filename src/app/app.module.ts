import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/Pages/header/header.component';
import { FooterComponent } from './Shared/Pages/footer/footer.component';
import { SideBarComponent } from './Shared/Pages/side-bar/side-bar.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login/login.component';
import { DisplayAliasComponent } from './Alias/display-alias/display-alias.component';
import {QRCodeModule} from "angularx-qrcode";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ChoisirCompteComponent } from './CompteBancaire/choisir-compte/choisir-compte.component';
import {AuthGuard} from "./Services/Securité/auth.guard";
import {JwtInterceptor} from "./Services/Securité/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    LoginComponent,
    DisplayAliasComponent,
    ChoisirCompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    QRCodeModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
