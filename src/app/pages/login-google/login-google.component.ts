import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BG_IMG_URL } from 'src/app/config';

declare var google: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css'],
})
export class LoginGoogleComponent implements OnInit {
  private router = inject(Router);
  bgUrl = BG_IMG_URL;
  userData: any;
  loading: boolean = false;
  private refreshRequired: boolean = false; 

  ngOnInit(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: '814344478260-95c7c64kanq1d5ffu6o8q60c6m7ileau.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'circular',
      width: 300,
    });

    // Check if a refresh is required
    if (this.refreshRequired) {
      this.refreshPage();
    }

    this.getData();
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      this.loading = true; // Show loader
      this.refreshRequired = true; // Set flag to refresh after login

      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.router.navigate(['/home']).then(() => {
        // Delay page refresh
        setTimeout(() => {
          this.refreshPage();
        }, 1000); // Adjust delay if necessary
      });
    }
  }

  refreshPage() {
    if (this.refreshRequired) {
      location.reload();
    }
  }

  getData() {
    const storedData = sessionStorage.getItem('loggedInUser');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      console.log('Retrieved User Data:', this.userData);
    } else {
      console.log('No user data found in session storage.');
    }
  }
}
