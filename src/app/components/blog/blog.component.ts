import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId = params.get('id');
      if (blogId) {
        this.loadBlogContent(blogId);
      } else {
        this.loadDefaultContent();
      }
    });
  }

  loadBlogContent(blogId: string): void {
    const blogFile = `/assets/blogs/blog-${blogId}.html`;

    fetch(blogFile)
      .then(response => response.text())
      .then(content => {
        this.blogContent = content;
      })
      .catch(error => {
        this.blogContent = '<p>No s\'ha pogut carregar el contingut del blog.</p>';
      });
  }

  loadDefaultContent(): void {
    /* TODO: Add default template or redirect to 404 */
    this.blogContent = '<p>Contingut per defecte</p>';
  }
}
