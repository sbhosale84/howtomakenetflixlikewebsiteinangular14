declare var google: any;
// import { Component, inject, NgZone, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { BG_IMG_URL } from 'src/app/config';
// import { UserService } from 'src/app/service/user.service';

// @Component({
//   selector: 'app-login-google',
//   templateUrl: './login-google.component.html',
//   styleUrls: ['./login-google.component.css'],
// })
// export class LoginGoogleComponent implements OnInit {
//   bgUrl = BG_IMG_URL;
//   userData: any;
//   loading: boolean = false;
//   private refreshRequired: boolean = false;
//   constructor(
//     private router: Router,
//     private ngZone: NgZone,
//     private toaster: ToastrService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     // Initialize Google Sign-In
//     google.accounts.id.initialize({
//       client_id:
//         '814344478260-95c7c64kanq1d5ffu6o8q60c6m7ileau.apps.googleusercontent.com',
//       callback: (response: any) => this.handleLogin(response),
//     });

//     google.accounts.id.renderButton(document.getElementById('google-btn'), {
//       theme: 'filled_blue',
//       size: 'large',
//       shape: 'circular',
//       width: 300,
//     });

//     // Check if a refresh is required
//     if (this.refreshRequired) {
//       this.refreshPage();
//     }

//     this.getData();
//   }

//   private decodeToken(token: string) {
//     return JSON.parse(atob(token.split('.')[1]));
//   }

//   handleLogin(response: any) {
//     if (response) {
//       this.loading = true; // Show loader
//       this.refreshRequired = true; // Set flag to refresh after login

//       // const payload = this.decodeToken(response.credential);
//       const payload = this.decodeToken(response.credential);
//       sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
//       this.userService.setUser(payload);

//       this.ngZone.run(() => {
//         this.userService.setUser(payload);
//         this.router.navigate(['/home']).then(() => {
//           this.toaster.success(`Welcome, ${payload.name}`);
//         });
//       });
//     }
//   }

//   refreshPage() {
//     if (this.refreshRequired) {
//       location.reload();
//     }
//   }

//   getData() {
//     const storedData = sessionStorage.getItem('loggedInUser');
//     if (storedData) {
//       this.userData = JSON.parse(storedData);
//       console.log('Retrieved User Data:', this.userData);
//     } else {
//       console.log('No user data found in session storage.');
//     }
//   }
// }



import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BG_IMG_URL } from 'src/app/config';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css'],
})
export class LoginGoogleComponent implements OnInit {
  bgUrl = BG_IMG_URL;
  userData: any;
  loading: boolean = false;
  private refreshRequired: boolean = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private toaster: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id:
        '814344478260-95c7c64kanq1d5ffu6o8q60c6m7ileau.apps.googleusercontent.com',
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
    if (response && response.credential) {
      this.loading = true; // Show loader
      this.refreshRequired = true; // Set flag to refresh after login

      // Decode the token and extract user information
      const payload = this.decodeToken(response.credential);
      
      // Extract user information from the payload
      const userData = {
        sessionId: payload.jti, // Using `jti` as session ID
        accountId: payload.sub, // Using `sub` as account ID
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      };

      // Store user data in session storage
      sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
      this.userService.setUser(userData);

      this.ngZone.run(() => {
        this.router.navigate(['/home']).then(() => {
          this.toaster.success(`Welcome, ${userData.name}`);
        });
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
