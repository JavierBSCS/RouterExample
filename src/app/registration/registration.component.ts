import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [FormsModule, CommonModule],
})
export class RegistrationComponent {
  fullname = '';
  address = '';
  mobilenumber = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  onRegister() {
    if (this.fullname && this.address && this.mobilenumber && this.username && this.email && this.password && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const userData = {
        fullname: this.fullname,
        address: this.address,
        mobilenumber: this.mobilenumber,
        username: this.username,
        email: this.email,
      };

      localStorage.setItem('userProfile', JSON.stringify(userData));
      alert('Registration successful! Redirecting to your profile...');
      this.router.navigate(['/user']);
    } else {
      alert('Please fill out all fields.');
    }
  }
}
