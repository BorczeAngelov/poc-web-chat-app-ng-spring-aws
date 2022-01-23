import { Component, OnInit } from '@angular/core';
import { Message } from '../message-board/Message';
import { WebChatService } from './web-chat.service';

@Component({
  selector: 'app-web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.css']
})
export class WebChatComponent implements OnInit {
  userName: String = 'WebSocket user';
  message: String = null;

  constructor(public webChatService: WebChatService) { }

  ngOnInit(): void {
    this.connect();
  }

  connect() {
    this.webChatService.connect();
  }

  disconnect() {
    this.webChatService.disconnect();
  }

  sendMessage() {
    if (this.message) {

      var newMessage: Message = {
        id: 0,
        user: this.userName,
        content: this.message,
        timeStamp: null,
      }

      console.log(this.message);


      this.webChatService.sendMessage(newMessage);
      this.message = null;
    }

  }
}