import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent, FormMode } from '../contact-form/contact-form.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-subscribe-unsubscribe',
  standalone: true,
  imports: [ContactFormComponent, HeaderComponent],
  templateUrl: './subscribe-unsubscribe.component.html',
  styleUrl: './subscribe-unsubscribe.component.css'
})
export class SubscribeUnsubscribeComponent implements OnInit {
  public mode : FormMode = FormMode.CONTACT;
  public title : string = '';
  public description : string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mode = this.router.url.startsWith('/unsubscribe') ? FormMode.UNSUBSCRIBE : FormMode.SUBSCRIBE;
    this.title = this.getTitle();
    this.description = this.getDescription();
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  getTitle(): string {
    if (this.mode === FormMode.SUBSCRIBE) {
      return 'Subscriu-te';
    } else {
      return 'Donar-se de baixa';
    }
  }

  getDescription(): string {
    if (this.mode === FormMode.SUBSCRIBE) {
      return `Subscriu-te i descobreix de forma quinzenal les últimes novetats de l'equip de SIG Games, l'estudi independent de desenvolupament de videojocs.`;
    } else {
      return '';
    }
  }
}
