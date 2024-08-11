import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private appName: string = 'SIGgames';

  getAppName(): string {
    return this.appName;
  }
}
