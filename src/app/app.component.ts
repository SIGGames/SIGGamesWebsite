import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // Logos
  private readonly originalLogo: string = 'assets/logo-white.png';
  private readonly altLogo: string = 'assets/logo-purple.png';

  constructor() {}

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
}
