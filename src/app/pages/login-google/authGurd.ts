import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      // User is authenticated, prevent access to the login page
      this.router.navigate(['/home']);
      return false;
    }
    // User is not authenticated, allow access to the login page
    return true;
  }
}
