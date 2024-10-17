import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      header?.classList.add('hidden');
    } else {
      header?.classList.remove('hidden');
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
