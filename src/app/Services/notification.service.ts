import { Injectable } from '@angular/core';
import {Client} from '@stomp/stompjs';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = 'http://localhost:9999/'

  private notificationsSubject = new Subject<any>();


  constructor(private client: Client) {
    this.connect();
  }

  public connect() {
    const alias = localStorage.getItem('alias'); // Assurez-vous que l'alias est stocké sous cette clé
    console.log("Connexion avec alias : ", alias); // Log pour vérifier l'alias
    this.client.onConnect = () => {
      this.client.subscribe(`/user/`+alias+`/queue/notifications`, message => {
        console.log("Message reçu : ", message.body); // Log pour vérifier le message reçu
        this.notificationsSubject.next(JSON.parse(message.body));
      });
    };
    this.client.activate();

  }
  getNotifications() {
    return this.notificationsSubject.asObservable();
  }
}
