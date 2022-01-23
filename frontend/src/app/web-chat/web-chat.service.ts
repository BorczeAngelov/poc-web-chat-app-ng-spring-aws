import { Injectable } from '@angular/core';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class WebChatService {
  private stompClient: CompatClient;
  public greetings: string[] = [];


  constructor(private httpService: HttpService) { }

  connect(): void {
    var socket = this.httpService.getWebSocket();
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => this.onConnected());
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  sendName(name: string) {
    this.stompClient.send('/api/ws/send-message', {}, JSON.stringify({ 'name': name }));
  }

  private onConnected() {
    this.stompClient.subscribe('/api/ws/send-message-response', data => this.onMessageReceived(data));
  }

  private onMessageReceived(data: IMessage) {
    var dynamicData = JSON.parse(data.body).greeting; //Use static types
    this.greetings.push(dynamicData);
  }
}