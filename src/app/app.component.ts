import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Configurations
  private readonly customFocusTitleSeconds: number = 2;

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
    this.titleService.setTitle(this.altTitle);
    setTimeout(() => {
      this.titleService.setTitle(this.originalTitle);
    }, this.customFocusTitleSeconds * 1000);
  }

  @HostListener('window:focus', [])
  onWindowFocus() {
    this.titleService.setTitle(this.focusTitle);
    setTimeout(() => {
      this.titleService.setTitle(this.originalTitle);
    }, this.customFocusTitleSeconds * 1000);
  }

  getAppName(): string {
    return this.appService.getAppName();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
