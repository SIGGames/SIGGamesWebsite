import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private lastScrollTop = 0;
  public isHidden: boolean = false;
  public isAtTop: boolean = true;
  private headerHeight = 92;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
      this.isAtTop = true;
      this.isHidden = false;
    } else {
      this.isAtTop = false;
    }

    if (!this.isAtTop && scrollTop <= this.headerHeight) {
      this.isHidden = false;
    } else if (scrollTop > this.headerHeight && scrollTop > this.lastScrollTop) {
      this.isHidden = true;
    } else if (scrollTop < this.lastScrollTop) {
      this.isHidden = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  onMouseEnter() {
    this.isHidden = false;
  }

  onMouseLeave() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.headerHeight && scrollTop > this.lastScrollTop) {
      this.isHidden = true;
    }
  }
}
