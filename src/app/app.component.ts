import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { Title } from '@angular/platform-browser';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Titles
  private readonly originalTitle: string;

  // Logos
  private readonly originalLogo: string = 'assets/logo-white.png';
  private readonly altLogo: string = 'assets/logo-purple.png';

  constructor(private appService: AppService, private titleService: Title) {
    this.originalTitle = this.appService.getAppName();
    this.titleService.setTitle(this.originalTitle);
  }

  @HostListener('window:blur', [])
  onWindowBlur() {
    this.changeLogoIcon(this.altLogo);
  }

  @HostListener('window:focus', [])
  onWindowFocus() {
    this.changeLogoIcon(this.originalLogo);
  }

  private changeLogoIcon(iconUrl: string) {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = iconUrl;
    }
  }

  getAppName(): string {
    return this.appService.getAppName();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
