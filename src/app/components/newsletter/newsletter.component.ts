import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsletterComponent implements OnInit {
  public newsletterContent: string = '';
  private newsletterId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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
          this.redirectNotFound();
        }
        return response.text();
      })
      .then(content => {
        this.setNewsletterContent(content);
      })
      .catch(error => {
        this.redirectNotFound();
      });
  }

  setNewsletterContent(content: string): void {
    const container = this.el.nativeElement.querySelector('#newsletter-container');
    this.renderer.setProperty(container, 'innerHTML', content);
  }

  redirectNotFound(): void {
    this.router.navigate(['/newsletter/not-found']);
  }
}
