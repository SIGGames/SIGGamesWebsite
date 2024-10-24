import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './newsletter.home.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, ContactFormComponent, HomeNavbarComponent]
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
    const nextSection = document.querySelector('.section');
    if (nextSection) {
      const offset = 180;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
