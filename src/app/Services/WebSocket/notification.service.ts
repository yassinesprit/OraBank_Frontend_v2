import {Injectable} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = 'http://localhost:9999/'

  /*  private stompClient!: Stomp.Client;
    private notificationsSubject = new BehaviorSubject<any[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();*/

  constructor(private client: Client) {
    this.connect();
  }

  public connect(): Observable<any> {
    const alias = localStorage.getItem('alias'); // Assurez-vous que l'alias est stocké sous cette clé
    console.log("Connexion avec alias : ", alias); // Log pour vérifier l'alias

    return new Observable(observer => {
      this.client.onConnect = () => {
        this.client.subscribe(`/user/${alias}/queue/notifications`, message => {
          console.log("Message reçu : ", message.body); // Log pour vérifier le message reçu
          observer.next(this.receiveMessage(message.body));
        });
      };
      this.client.activate();
    });
  }

  private receiveMessage(body: string): any {
    const message = JSON.parse(body) as any;
    console.log("Notification reçue : ", message);
    return message;
  }

  /*private initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:9999/ws');
    this.stompClient = new Stomp.Client({
      webSocketFactory: () => new SockJS('http://localhost:9999/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      const user = localStorage.getItem('username');  // Remplacez par la logique pour obtenir le nom d'utilisateur actuel
      this.stompClient.subscribe(`/user/${user}/queue/notifications`, (message) => {
        this.addNotification(JSON.parse(message.body));
      });
    };

    this.stompClient.activate();
  }

  private addNotification(notification: any) {
    const currentValue = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentValue, notification]);
  }*/
}
