import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId = params.get('id');
      if (blogId) {
        this.loadBlogContent(blogId);
      } else {
        this.redirectNotFound();
      }
    });
  }

  loadBlogContent(blogId: string): void {
    const blogFile = `/assets/blogs/blog-${blogId}.html`;

    try {
      new URL(blogFile, window.location.origin);
      fetch(blogFile)
        .then(response => {
          if (!response.ok) {
            this.redirectNotFound();
          }
          return response.text();
        })
        .then(content => {
          this.setBlogContent(content);
          this.addClickEventListeners();
        })
        .catch(error => {
          this.redirectNotFound();
        });
    } catch (error) {
      this.redirectNotFound();
    }
  }

  setBlogContent(content: string): void {
    const container = this.el.nativeElement.querySelector('#blog-container');
    this.renderer.setProperty(container, 'innerHTML', content);
  }

  addClickEventListeners(): void {
    const container = this.el.nativeElement.querySelector('#blog-container');
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
    this.router.navigate(['/blog/not-found']);
  }
}
