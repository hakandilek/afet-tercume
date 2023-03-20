import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


platformBrowserDynamic().bootstrapModule(AppModule)
  .then((module) => {
    // TODO add && environment.production
    // console.log('after BOOTSTRAP');
    // if ('serviceWorker' in navigator) {
    //   console.log('serviceWorker navigator icinde');
    //   // navigator.serviceWorker.register('my-worker.js');
    // }
  })
  .catch(err => console.error(err));
