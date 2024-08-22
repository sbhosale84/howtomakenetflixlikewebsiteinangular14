import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userDataSource = new BehaviorSubject<any>(null);
  currentUserData = this.userDataSource.asObservable();

  updateUserData(data: any) {
    this.userDataSource.next(data);
  }
}
