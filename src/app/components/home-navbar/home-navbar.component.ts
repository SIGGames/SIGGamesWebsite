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
    this.loadSections();
    this.getActiveSection();
  }

  scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const footer = document.querySelector('footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      this.isNearFooter = footerRect.top < window.innerHeight;
    }
    this.getActiveSection();
  }

  loadSections() {
    const sectionElements = document.querySelectorAll('section[id]');
    this.sections = Array.from(sectionElements).map(section => `#${section.id}`);
  }

  getActiveSection() {
    const visiblePercentage = 0.5;
    for (let sectionId of this.sections) {
      const section = document.querySelector(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * visiblePercentage) {
          this.activeSection = sectionId;
          break;
        }
      }
    }

    // HACK: If the user scrolls up to the top, the active section is the home section
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop === 0) {
      this.activeSection = '#home';
    }
  }
}
