import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './service/user.service';
import { LOGO_URL } from './config';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'showtime';
  logoUrl = LOGO_URL;
  userData: any;
  navbg: any;
  showNavbar: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // Subscribe to user data changes
    this.userService.user$.subscribe(user => {
      this.userData = user;
      console.log('Retrieved User Data:', this.userData);
    });

    // Check current route and toggle navbar visibility
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Hide navbar on login page
        this.showNavbar = event.url !== '/login';
      });

    // Initialize background color based on scroll
    this.updateNavBackground();
  }

  @HostListener('document:scroll')
  updateNavBackground() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000000',
      };
    } else {
      this.navbg = {};
    }
  }

  logOut() {
    this.userService.clearUser();
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
