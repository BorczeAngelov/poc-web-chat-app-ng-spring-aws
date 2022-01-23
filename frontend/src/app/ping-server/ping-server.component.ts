import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { PingServerService } from './ping-server.service';

@Component({
  selector: 'app-ping-server',
  templateUrl: './ping-server.component.html',
  styleUrls: ['./ping-server.component.css']
})
export class PingServerComponent implements OnInit {

  connectMessage: '';

  constructor(
    private http: HttpClient,
    public pingServerService: PingServerService,
    public httpService: HttpService) { }

  ngOnInit(): void {

    this.http.get(this.httpService.serverUrl + '/message').pipe(
      first(),
      tap(result => console.log('Message received from the server: ', result)),
      map(result => this.connectMessage = (result as any).message)
    ).subscribe();
  }

  pingServer(): void {
    this.pingServerService.pingServer();
  }
}