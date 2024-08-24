import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule],
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

  sendEmail(form: NgForm) {
    if (form.valid) {
      emailjs.send('service_0wg0538', 'template_vff6j8p', {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        message: form.value.message
      }, 'mzm-0jmzxq72JQMlu')
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully!', response.status, response.text);
        form.resetForm();
      }, (error) => {
        console.error('Failed to send email. Error:', error);
      });
    }
  }
}
