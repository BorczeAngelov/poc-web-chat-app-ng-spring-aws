import { Injectable } from '@angular/core';
import { CompatClient, IFrame, IMessage, Stomp } from '@stomp/stompjs';
import * as  SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebChatService {
  private stompClient: CompatClient;
  public greetings: string[] = [];

  constructor() {}

  connect(): void {
    const socket = new SockJS('http://localhost:8080/api/ws-stomp-endpoint');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, data => this.onConnected(data));
  }

  disconnect() {
    this.stompClient.disconnect();
    console.log('Disconnected!');
  }

  sendName(name: string) {
    this.stompClient.send('/hello', {}, JSON.stringify({ 'name': name }));
  }

  private onConnected(arg: IFrame) {
    console.log('onConnected: ' + arg);
    this.stompClient.subscribe('/topic/hi', data => this.onMessageReceived(data));
  }

  private onMessageReceived(data: IMessage) {
    console.log('onMessageReceived: ' + data);
    var dynamicData = JSON.parse(data.body).greeting; //Use static types
    this.greetings.push(dynamicData);
  }
}