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

  ngOnInit(): void {
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

  getActiveSection() {
    const visiblePercentage = 0.5;
    const sections = ['#home', '#about', '#games', '#blog', '#newsletter', '#contact'];
    for (let sectionId of sections) {
      const section = document.querySelector(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * visiblePercentage) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }
}
