import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class HomeComponent implements OnInit {
  appName: string = '';
  isSendBtnDisabled: boolean = false;
  newsletters: any[] = [];
  // Limit the number of newsletters to display. If -1, display all newsletters.
  private readonly MAX_NEWSLETTERS: number = 4;

  // Email Config
  private readonly emailServiceId: string = 'service_0wg0538';
  private readonly emailTemplateId: string = 'template_0vewupv';
  private readonly emailUserId: string = 'mzm-0jmzxq72JQMlu';
  private readonly EMAIL_TIMEOUT: number = 5 * 60 * 1000; // 5 minutes

  constructor(private appService: AppService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.appName = this.appService.getAppName();
    if (typeof window !== 'undefined') {
      this.checkEmailTimeout();
    }
    this.loadNewsletters();
  }

  loadNewsletters() {
    const path: string = 'assets/newsletter/recent-newsletters.json';
    this.http.get<any>(path).subscribe((data) => {
      let newsletters = data.newsletters.map((newsletter: any) => ({
        ...newsletter,
        title: `Newsletter ${newsletter.id}`
      }));

      if (this.MAX_NEWSLETTERS !== -1) {
        newsletters = newsletters.slice(0, this.MAX_NEWSLETTERS);
      }

      this.newsletters = newsletters;
    });
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
      if (!this.isUserRecentSentEmail()) {
        emailjs.send(this.emailServiceId, this.emailTemplateId, {
          subject: form.value.subject,
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          date: new Date().toLocaleString(),
          currentYear: new Date().getFullYear(),
          message: form.value.message
        }, this.emailUserId)
        .then((response: EmailJSResponseStatus) => {
          this.sendNotification(`El correu s'ha enviat correctament`);
          form.resetForm();
          this.setLastEmailSentTime();
        }, (error) => {
          this.sendNotification(`No s'ha pogut enviar el correu correctament`);
        });
        this.router.navigate(['/']);
      } else {
        this.sendNotification(`Has d'esperar ${this.EMAIL_TIMEOUT / 1000} segons abans de tornar a enviar un correu`);
        this.disableSendButton();
      }
    }
  }

  sendNotification(msg: string) {
    alert(msg);
  }

  private setLastEmailSentTime() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lastEmailSentTime', Date.now().toString());
    }
  }

  private getLastEmailSentTime(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('lastEmailSentTime');
    }
    return null;
  }

  public isUserRecentSentEmail(): boolean {
    const lastEmailSentTime = this.getLastEmailSentTime();
    if (lastEmailSentTime) {
      const elapsedTime = Date.now() - parseInt(lastEmailSentTime, 10);
      return elapsedTime < this.EMAIL_TIMEOUT;
    }
    return false;
  }

  private disableSendButton() {
    this.isSendBtnDisabled = true;
    setTimeout(() => {
      this.isSendBtnDisabled = false;
    }, this.EMAIL_TIMEOUT);
  }

  private checkEmailTimeout() {
    if (this.isUserRecentSentEmail()) {
      this.disableSendButton();
    }
  }

  public goToPage(urlBase: string, id: string) {
    this.router.navigate([`/${urlBase}`, id]);
    window.scrollTo(0, 0);
  }
}
