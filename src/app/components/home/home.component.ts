import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appName: string = '';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appName = this.appService.getAppName();
  }

  scrollToNextSection() {
    const nextSection = document.querySelector('.section');
    if (nextSection) {
      const offset = 180;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
