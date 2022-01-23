import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';
import { PingServerResponse } from './pingServerResponse';

@Injectable({
  providedIn: 'root'
})
export class PingServerService {
  pingResponeMessage$: Observable<PingServerResponse>;

  constructor(private http: HttpClient, private httpService: HttpService) { }


  pingServer(): void {
    this.pingResponeMessage$ = this.http.get<PingServerResponse>(this.httpService.serverUrl + '/api/pingServer');
  }
}