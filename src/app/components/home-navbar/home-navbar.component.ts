import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent implements OnInit {
  isNearFooter: boolean = false;
  activeSection: string = '';
  sections: string[] = [];

  ngOnInit(): void {
    if (typeof document === 'undefined') {
      return;
    }

    this.loadSections();
    this.getActiveSection();
  }

  scrollToSection(sectionId: string) {
    if (typeof document === 'undefined') {
      return;
    }

    const section = document.querySelector(sectionId);
    if (section) {
      this.activeSection = sectionId;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (typeof window !== 'undefined') {
        window.setTimeout(() => {
          this.activeSection = sectionId;
        }, 450);
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const footer = document.querySelector('footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      this.isNearFooter = footerRect.top < window.innerHeight;
    }
    this.getActiveSection();
  }

  loadSections() {
    if (typeof document === 'undefined') {
      return;
    }

    const sectionElements = document.querySelectorAll('section[id]');
    this.sections = Array.from(sectionElements).map(section => `#${section.id}`);
  }

  getActiveSection() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const viewportAnchor = window.innerHeight * 0.45;

    for (let sectionId of this.sections) {
      const section = document.querySelector(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom >= viewportAnchor) {
          this.activeSection = sectionId;
          break;
        }
      }
    }

    // If the user scrolls up to the top, the active section is the home section.
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const home = document.querySelector('#home');
    const homeBottom = home?.getBoundingClientRect().bottom ?? 0;
    if (scrollTop === 0 && homeBottom > viewportAnchor) {
      this.activeSection = '#home';
    }
  }
}
