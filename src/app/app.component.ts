import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LOGO_URL } from './config';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit { // Implement OnInit
  title = 'showtime';
  logoUrl = LOGO_URL;
  userData: any;

  constructor(private userService: LoginService, private router: Router) {}

  ngOnInit() { // Use ngOnInit lifecycle hook
    this.getData();
  }

  navbg: any;
  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000000',
      };
    } else {
      this.navbg = {};
    }
  }

  getData() {
    const storedData = sessionStorage.getItem('loggedInUser');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      console.log('Retrieved User Data:', this.userData.picture);
    } else {
      console.log('No user data found in session storage.');
    }
  }

  logOut() {
    sessionStorage.removeItem('loggedInUser');
    this.userData = null; // Clear user data in the component
    this.userService.signOut();
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
