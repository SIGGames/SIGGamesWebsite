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
      if (newsletterId && newsletterId !== '0') {
        this.loadNewsletterContent(newsletterId);
      } else {
        this.loadCompilationNewsletter();
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
        this.addClickEventListeners();
      })
      .catch(error => {
        this.redirectNotFound();
      });
  }

  loadCompilationNewsletter(): void {
    const compilationFile = `/assets/newsletter/00_newsletter-devteam-compilation.html`;

    fetch(compilationFile)
      .then(response => {
        if (!response.ok) {
          this.redirectNotFound();
        }
        return response.text();
      })
      .then(content => {
        this.setNewsletterContent(content);
        this.addClickEventListeners();
      })
      .catch(error => {
        this.redirectNotFound();
      });
  }

  setNewsletterContent(content: string): void {
    const container = this.el.nativeElement.querySelector('#newsletter-container');
    this.renderer.setProperty(container, 'innerHTML', content);
  }

  addClickEventListeners(): void {
    const container = this.el.nativeElement.querySelector('#newsletter-container');
    const links = container.querySelectorAll('a[routerLink]');
    links.forEach((link: HTMLAnchorElement) => {
      this.renderer.listen(link, 'click', (event) => {
        event.preventDefault();
        const url = link.getAttribute('routerLink');
        this.router.navigate([url]);
      });
    });
  }

  redirectNotFound(): void {
    this.router.navigate(['/not-found']);
  }
}
