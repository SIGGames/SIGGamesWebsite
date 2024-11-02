import { Component, OnInit, Input } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { get } from 'http';

export enum FormMode {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  CONTACT = 'contact'
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  @Input() mode: FormMode = FormMode.CONTACT;
  subject: string | null = null;
  public isSendBtnDisabled: boolean = false;

  // Email Config
  private readonly emailServiceId: string = 'service_0wg0538';
  private readonly emailTemplateId: string = 'template_0vewupv';
  private readonly emailUserId: string = 'mzm-0jmzxq72JQMlu';
  private readonly EMAIL_TIMEOUT: number = 5 * 60 * 1000; // 5 minutes

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.checkEmailTimeout();
    }
    this.subject = this.getSubject();
  }

  sendEmail(form: NgForm) {
    if (form.valid) {
      if (!this.isUserRecentSentEmail()) {
        emailjs
          .send(
            this.emailServiceId,
            this.emailTemplateId,
            {
              subject: form.value.subject || this.subject,
              firstName: form.value.firstName,
              lastName: form.value.lastName,
              email: form.value.email,
              date: new Date().toLocaleString(),
              currentYear: new Date().getFullYear(),
              message: form.value.message,
            },
            this.emailUserId
          )
          .then(() =>{
              this.sendNotification(`El correu s'ha enviat correctament`);
              form.resetForm();
              this.setLastEmailSentTime();
            },
            (error) => {
              this.sendNotification(
                `No s'ha pogut enviar el correu correctament`
              );
            }
          );
        this.router.navigate(['/']);
      } else {
        this.sendNotification(
          `Has d'esperar ${
            this.EMAIL_TIMEOUT / 1000
          } segons abans de tornar a enviar un correu`
        );
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

  private getSubject(): string {
    if (this.mode == FormMode.CONTACT) {
      return 'Contacte';
    } else if (this.mode == FormMode.SUBSCRIBE) {
      return 'Nova Subscripció';
    } else if (this.mode == FormMode.UNSUBSCRIBE) {
      return 'Baixa Subscripció';
    } else {
      return 'Sense Assumpte';
    }
  }
}
