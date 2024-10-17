import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NewsletterComponent implements OnInit {
  public newsletterContent: string = '';
  private newsletterId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newsletterId = params.get('id');
      if (newsletterId) {
        this.loadNewsletterContent(newsletterId);
      } else {
        this.redirectNotFound();
      }
    });
  }

  loadNewsletterContent(newsletterId: string): void {
    this.newsletterId = newsletterId;
    const newsletterFile = `/assets/newsletter/${newsletterId}_newsletter-devteam.html`;

    fetch(newsletterFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(content => {
        this.newsletterContent = content;
      })
      .catch(error => {
        this.redirectNotFound();
      });
  }

  redirectNotFound(): void {
    this.router.navigate(['/newsletter/' + this.newsletterId + '/not-found']);
  }
}
