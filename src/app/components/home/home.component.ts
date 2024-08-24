import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class HomeComponent implements OnInit {
  appName: string = '';

  // Email Config
  private emailServiceId: string = 'service_0wg0538';
  private emailTemplateId: string = 'template_vff6j8p';
  private emailUserId: string = 'mzm-0jmzxq72JQMlu';

  constructor(private appService: AppService, private router: Router) { }

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
  sendEmail(form: NgForm) {
    if (form.valid) {
      emailjs.send(this.emailServiceId, this.emailTemplateId, {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        message: form.value.message
      }, this.emailUserId)
      .then((response: EmailJSResponseStatus) => {
        this.sendNotification(`El correu s'ha enviat correctament`);
        form.resetForm();
      }, (error) => {
        this.sendNotification(`No s'ha pogut enviar el correu correctament`);
      });
      this.router.navigate(['/']);
    }
  }

  sendNotification(msg: string) {
    alert(msg);
  }
}
