import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }
  url = 'https://dysmsapi.aliyuncs.com';
  getCode() {
    const result = this.httpClient.get(this.url);
    console.log(result);
  }
}
