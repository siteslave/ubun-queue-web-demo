import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  async getQueue() {
    const url = 'http://localhost:3000/queue/all-queue-clinic';
    return await this.httpClient.get(url).toPromise();
  }

}
