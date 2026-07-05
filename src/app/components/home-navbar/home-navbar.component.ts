import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

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
      this.setActiveSection(sectionId);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (typeof window !== 'undefined') {
        window.setTimeout(() => {
          this.setActiveSection(sectionId);
        }, 450);
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.handleScroll();
  }

  @HostListener('body:scroll', [])
  onBodyScroll() {
    this.handleScroll();
  }

  @HostListener('document:scroll', [])
  onDocumentScroll() {
    this.handleScroll();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.loadSections();
    this.handleScroll();
  }

  private handleScroll() {
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

    const sectionElements = document.querySelectorAll('#home, section[id]');
    this.sections = Array.from(sectionElements).map(section => `#${section.id}`);
  }

  getActiveSection() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const anchorY = window.innerHeight * 0.42;
    const anchorX = window.innerWidth / 2;
    const sectionAtAnchor = this.getSectionAtPoint(anchorX, anchorY);

    if (sectionAtAnchor) {
      this.setActiveSection(`#${sectionAtAnchor.id}`);
      return;
    }

    let closestSection = this.activeSection || this.sections[0] || '';
    let closestDistance = Number.POSITIVE_INFINITY;

    for (let sectionId of this.sections) {
      const section = document.querySelector(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();

        const distance = Math.min(
          Math.abs(rect.top - anchorY),
          Math.abs(rect.bottom - anchorY)
        );

        if (distance < closestDistance) {
          closestSection = sectionId;
          closestDistance = distance;
        }
      }
    }

    if (closestSection) {
      this.setActiveSection(closestSection);
    }
  }

  private getSectionAtPoint(x: number, y: number): Element | null {
    const elements = document.elementsFromPoint(x, y);

    for (const element of elements) {
      const section = element.closest('#home, section[id]');

      if (section?.id) {
        return section;
      }
    }

    return null;
  }

  private setActiveSection(sectionId: string) {
    if (this.activeSection === sectionId) {
      return;
    }

    this.activeSection = sectionId;
    this.cdr.detectChanges();
  }
}
