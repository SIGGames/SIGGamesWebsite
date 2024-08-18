import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Configurations
  private readonly showCustomFocusTitle: boolean = true;
  private readonly customFocusTitleSeconds: number = 2;
  private readonly persistAltTitleOnBlur: boolean = true;

  // Titles
  private readonly originalTitle: string;
  private readonly altTitle: string = 'SIG Games :(';
  private readonly focusTitle: string = 'SIG Games :)';

  constructor(private appService: AppService, private titleService: Title) {
    this.originalTitle = this.appService.getAppName();
    this.titleService.setTitle(this.originalTitle);
  }

  @HostListener('window:blur', [])
  onWindowBlur() {
    if (this.persistAltTitleOnBlur) {
      this.titleService.setTitle(this.altTitle);
    }
  }

  @HostListener('window:focus', [])
  onWindowFocus() {
    if (this.showCustomFocusTitle) {
      this.titleService.setTitle(this.focusTitle);
      setTimeout(() => {
        this.titleService.setTitle(this.originalTitle);
      }, this.customFocusTitleSeconds * 1000);
    } else {
      this.titleService.setTitle(this.originalTitle);
    }
  }

  getAppName(): string {
    return this.appService.getAppName();
  }
}
