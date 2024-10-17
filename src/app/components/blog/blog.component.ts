import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
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

    fetch(blogFile)
      .then(response => response.text())
      .then(content => {
        this.blogContent = content;
      })
      .catch(error => {
        this.redirectNotFound();
      });
  }

  redirectNotFound(): void {
    this.router.navigate(['/blog/' + this.blogId + '/not-found']);
  }
}
