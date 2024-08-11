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
}
