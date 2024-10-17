import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  blogContent: string = '';
  private blogId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

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
    this.blogId = blogId;
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
          this.blogContent = content;
        })
        .catch(error => {
          this.redirectNotFound();
        });
    } catch (error) {
      this.redirectNotFound();
    }
  }

  redirectNotFound(): void {
    this.router.navigate(['/blog/not-found']);
  }
}
