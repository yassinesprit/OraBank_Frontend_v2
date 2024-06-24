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
import {ClipboardModule} from "ngx-clipboard";
import { AliasFormComponent } from './Alias/alias-form/alias-form.component';
import { HomeComponent } from './Pages/home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransfererComponent } from './transaction/transferer/transferer.component';
import {NotificationService} from "./Services/WebSocket/notification.service";
import {Client, Stomp} from "@stomp/stompjs";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    LoginComponent,
    DisplayAliasComponent,
    ChoisirCompteComponent,
    AliasFormComponent,
    HomeComponent,
    TransactionComponent,
    TransfererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    QRCodeModule,
    HttpClientModule,
    ClipboardModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: NotificationService,
      useFactory: (client: Client) => {
        return new NotificationService(client);
      },
      deps: [Client]
    },
    {
      provide: Client,
      useValue: Stomp.client('ws://localhost:9999/ws')
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
