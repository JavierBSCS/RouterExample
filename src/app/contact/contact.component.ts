import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submittedMessages: { name: string; email: string; message: string }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {

    if (isPlatformBrowser(this.platformId)) {
      const savedMessages = localStorage.getItem('submittedMessages');
      if (savedMessages) {
        try {
          this.submittedMessages = JSON.parse(savedMessages);
          if (!Array.isArray(this.submittedMessages)) {
            this.submittedMessages = [];
          }
        } catch (e) {
          this.submittedMessages = [];
        }
      }
    }
  }

  onSubmit() {

    if (this.contact.name && this.contact.email && this.contact.message) {
      this.submittedMessages.push({
        name: this.contact.name,
        email: this.contact.email,
        message: this.contact.message
      });

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('submittedMessages', JSON.stringify(this.submittedMessages));
      }

      // Clear the form
      this.contact.name = '';
      this.contact.email = '';
      this.contact.message = '';
    }
  }

  onDelete(index: number) {
    this.submittedMessages.splice(index, 1);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('submittedMessages', JSON.stringify(this.submittedMessages));
    }
  }
}
