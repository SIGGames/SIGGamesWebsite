import { Component } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public appName: string = '';
  public currentYear: number = 0;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appName = this.getAppName();
    this.currentYear = this.getCurrentYear();
  }

  getAppName(): string {
    return this.appService.getAppName();
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
