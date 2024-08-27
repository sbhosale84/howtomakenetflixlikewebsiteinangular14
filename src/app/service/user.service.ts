import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Initialize with null or default user data
  private userSubject = new BehaviorSubject<any>(this.loadUserFromStorage());
  
  // Expose as Observable
  user$ = this.userSubject.asObservable();

  // Update user data
  setUser(userData: any) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    this.userSubject.next(userData); // Notify subscribers with the new user data
  }

  // Clear user data
  clearUser() {
    sessionStorage.removeItem('loggedInUser');
    this.userSubject.next(null); // Notify subscribers with null
  }

  // Load user data from session storage
  private loadUserFromStorage(): any {
    const storedData = sessionStorage.getItem('loggedInUser');
    return storedData ? JSON.parse(storedData) : null;
  }
}
