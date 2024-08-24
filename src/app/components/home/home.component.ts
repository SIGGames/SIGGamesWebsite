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
  isSendBtnDisabled: boolean = false;

  // Email Config
  private readonly emailServiceId: string = 'service_0wg0538';
  private readonly emailTemplateId: string = 'template_vff6j8p';
  private readonly emailUserId: string = 'mzm-0jmzxq72JQMlu';
  private readonly EMAIL_TIMEOUT: number = 5 * 60 * 1000; // 5 minutes

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
    if (form.valid && !this.isUserRecentSentEmail()) {
      emailjs.send(this.emailServiceId, this.emailTemplateId, {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        message: form.value.message
      }, this.emailUserId)
      .then((response: EmailJSResponseStatus) => {
        this.sendNotification(`El correu s'ha enviat correctament`);
        form.resetForm();
        this.setLastEmailSentTime();
        this.disableSendButton();
      }, (error) => {
        this.sendNotification(`No s'ha pogut enviar el correu correctament`);
      });
      this.router.navigate(['/']);
    } else {
      this.sendNotification(`Has d'esperar ${this.EMAIL_TIMEOUT / 1000} segons abans de tornar a enviar un correu`);
    }
  }

  sendNotification(msg: string) {
    alert(msg);
  }

  private setLastEmailSentTime() {
    localStorage.setItem('lastEmailSentTime', new Date().toISOString());
  }

  private getLastEmailSentTime(): string | null {
    return localStorage.getItem('lastEmailSentTime');
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
}
