import { Component, OnInit } from '@angular/core';
import { WebChatService } from './web-chat.service';

@Component({
  selector: 'app-web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.css']
})
export class WebChatComponent implements OnInit {  
  userName: String = 'Guest';
  message: String = null;

  constructor(public webChatService: WebChatService) { }

  ngOnInit(): void {
  }

  connect() {
    this.webChatService.connect();
  }  

  disconnect() {
    this.webChatService.disconnect();
  }

  sendMessage() {    
    this.webChatService.sendMessage(this.message);
  }
}