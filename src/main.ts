import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Title } from '@angular/platform-browser';
import { AppService } from './app/app.service';

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    const appService = appRef.injector.get(AppService);
    const titleService = appRef.injector.get(Title);
    titleService.setTitle(appService.getAppName());
  })
  .catch((err) => console.error(err));
