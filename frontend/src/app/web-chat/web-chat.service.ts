import { Injectable } from '@angular/core';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class WebChatService {
  public stompClient: CompatClient;
  public greetings: String[] = [];

  constructor(private httpService: HttpService) { }

  connect(): void {
    var socket = this.httpService.getWebSocket();
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => this.onConnected());
  }

  disconnect() {
    this.stompClient.disconnect();
    this.stompClient?.state
  }

  sendMessage(name: String) {
    this.stompClient.send('/api/ws/send-message', {}, JSON.stringify({ 'name': name }));
  }

  private onConnected() {
    this.stompClient.subscribe('/api/ws/send-message-response', data => this.onMessageReceived(data));
  }

  private onMessageReceived(data: IMessage) {
    var newData = JSON.parse(data.body).greeting; //Use static types
    this.greetings = [...this.greetings, newData];
  }
}