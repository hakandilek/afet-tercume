import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OfflineService } from './services/offline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  /**
   *
   */
  constructor(
    private titleService: Title,
    private offlineService: OfflineService
  ) {
    this.titleService.setTitle('Afet Terimleri');
    this.offlineService.initServiceWorker();
  }
}
