import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private appName: string = 'SIG Games';

  getAppName(): string {
    return this.appName;
  }
}
