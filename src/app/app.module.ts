import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {SideBarComponent} from './Shared/side-bar/side-bar.component';
import {AdminSideBarComponent} from './Shared/admin-side-bar/admin-side-bar.component';
import {CommonModule} from "@angular/common";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatError, MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {LoginComponent} from './login/login.component';
import {AuthGuard} from "./Security/auth.guard";
import {JwtInterceptor} from "./Security/jwt.interceptor";
import {Client, Stomp} from "@stomp/stompjs";
import {NotificationService} from "./Services/notification.service";
import {MatBadgeModule} from "@angular/material/badge";
import {HomeComponent} from './home/home.component';
import {AliasFormComponent} from './Alias/alias-form/alias-form.component';
import {AliasDisplayComponent} from './Alias/alias-display/alias-display.component';
import {BAChooseComponent} from './BankAccount/ba-choose/ba-choose.component';
import {TransferComponent} from './Transactions/transfer/transfer.component';
import {MatDividerModule} from "@angular/material/divider";
import {QRCodeModule} from "angularx-qrcode";
import {ClipboardModule} from "ngx-clipboard";
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from "@angular/material/expansion";
import {SendComponent} from './Transactions/send/send.component';
import {ReceiveComponent} from './Transactions/receive/receive.component';
import {ListUsersComponent} from './User/list-users/list-users.component';
import {TransactionsListComponent} from './Transactions/transactions-list/transactions-list.component';
import {MatPaginator} from "@angular/material/paginator";
import {ContactListComponent} from './Contact/contact-list/contact-list.component';
import {DemandeListComponent} from './Transactions/demande-list/demande-list.component';
import {ErrorComponent} from './Shared/error/error.component';
import { DetailUserComponent } from './User/detail-user/detail-user.component';
import { UnauthorizedComponent } from './Shared/unauthorized/unauthorized.component';
import { DetailsBAComponent } from './BankAccount/details-ba/details-ba.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ContactFormComponent } from './Contact/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    AdminSideBarComponent,
    LoginComponent,
    HomeComponent,
    AliasFormComponent,
    AliasDisplayComponent,
    BAChooseComponent,
    TransferComponent,
    SendComponent,
    ReceiveComponent,
    ListUsersComponent,
    TransactionsListComponent,
    ContactListComponent,
    DemandeListComponent,
    ErrorComponent,
    DetailUserComponent,
    UnauthorizedComponent,
    DetailsBAComponent,
    ContactFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatSidenavModule,
    MatListModule,
    FormsModule, // Add FormsModule here
    HttpClientModule, // Add HttpClientModule here
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatListModule, MatToolbarModule, MatError, MatInputModule, MatTableModule, MatIcon,
    ReactiveFormsModule, MatCheckbox, MatSidenavContainer, MatSidenav, MatSelect, MatOption, MatMenu, MatMenuModule, MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatDividerModule,
    QRCodeModule,
    ClipboardModule, MatAccordion,
    MatSelectModule, MatPaginator, MatExpansionPanel,MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
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
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
