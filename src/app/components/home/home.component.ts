import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './newsletter.home.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, ContactFormComponent, HomeNavbarComponent]
})
export class HomeComponent implements OnInit {
  appName: string = '';
  newsletters: any[] = [];
  // Limit the number of newsletters to display. If -1, display all newsletters.
  private readonly MAX_NEWSLETTERS: number = 3;

  constructor(private appService: AppService, private http: HttpClient) {}

  ngOnInit(): void {
    this.appName = this.appService.getAppName();
    this.loadNewsletters();
  }

  loadNewsletters() {
    if (typeof window === 'undefined') {
      return;
    }

    const path: string = 'assets/newsletter/recent-newsletters.json';
    this.http.get<any>(path).subscribe((data) => {
      let newsletters = data.newsletters;

      if (this.MAX_NEWSLETTERS !== -1) {
        newsletters = newsletters.slice(0, this.MAX_NEWSLETTERS);
      }

      this.newsletters = newsletters;
    });
  }

  scrollToNextSection() {
    if (typeof document === 'undefined') {
      return;
    }

    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  handleNewsletterImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.src = 'assets/transparent-banner.png';
    image.classList.add('newsletter-img-fallback');
  }
}
