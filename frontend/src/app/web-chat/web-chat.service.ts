import { Injectable } from '@angular/core';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { HttpService } from '../http.service';
import { Message } from '../message-board/Message';
import { MessageBoard } from '../message-board/messageBoard';

@Injectable({
  providedIn: 'root'
})
export class WebChatService {
  public stompClient: CompatClient;
  public messageBoard: MessageBoard;

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

  sendMessage(newMessage: Message) {
    this.stompClient.send('/api/ws/send-message', {}, JSON.stringify(newMessage));
  }

  private onConnected() {
    this.stompClient.subscribe('/api/ws/send-message-response', data => this.onMessageReceived(data));
  }

  private onMessageReceived(data: IMessage) {
    var newMessageBoard: MessageBoard = JSON.parse(data.body);
    this.messageBoard = newMessageBoard;

    console.log(this.messageBoard);

    // var newData = JSON.parse(data.body).greeting; //Use static types
    // this.greetings = [...this.greetings, newData];
  }
}