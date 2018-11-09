import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;
  public message: string;

  queues = [];

  constructor(private _mqttService: MqttService, private apiService: ApiService) {
    this.subscription = this._mqttService.observe('h4u/queue/clinic/all')
      .subscribe((message: IMqttMessage) => {
        this.message = message.payload.toString();
        console.log(this.message);
        this.getQueue();
      });
  }

  ngOnInit(): void {
    this.getQueue();
  }

  async getQueue() {
    try {
      var res: any = await this.apiService.getQueue();
      this.queues = res.rows;
    } catch (error) {
      console.log(error)
    }
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
