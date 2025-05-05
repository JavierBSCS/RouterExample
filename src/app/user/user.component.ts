import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userProfile: {
    fullname: string;
    address: string;
    mobilenumber: string;
    username: string;
    email: string;
  } | null = null;

  profilePictureUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
    const userData = localStorage.getItem('userProfile');
    const profilePic = localStorage.getItem('profilePicture');

    if (userData) {
      this.userProfile = JSON.parse(userData);
    } else {
      alert('No user data found! Redirecting to registration.');
      window.location.href = '/register';
    }


    if (profilePic) {
      this.profilePictureUrl = profilePic;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profilePictureUrl = reader.result;


        if (reader.result) {
          localStorage.setItem('profilePicture', reader.result.toString());
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
