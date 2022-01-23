import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Message } from './Message';
import { MessageBoard } from './messageBoard';

@Injectable({
  providedIn: 'root'
})
export class MessageBoardService {

  messageBoard$: Observable<MessageBoard>;

  constructor(private http: HttpClient, private httpService: HttpService) {}

  loadMessageBoard(): void {
    this.messageBoard$ = this.http.get<MessageBoard>(this.httpService.serverUrl + '/api/messageboard/getmessageboard');
  }

  sendMessage(newMessage: Message) {
    this.http.post<MessageBoard>(this.httpService.serverUrl + '/api/messageboard/postmessage', newMessage)
      .pipe(
        tap(_ => this.loadMessageBoard())
      ).subscribe();
  }
  
  clearMessageBoard() {
    this.http.get<MessageBoard>(this.httpService.serverUrl + '/api/messageboard/clearmessageboard')
      .pipe(
        tap(_ => this.loadMessageBoard())
      ).subscribe();
  }
}
