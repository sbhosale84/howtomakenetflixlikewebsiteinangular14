import { Component, inject } from '@angular/core';
import { BG_IMG_URL } from '../../config';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  bgUrl = BG_IMG_URL;

  email!: string;
  password!: string;
  loginService = inject(LoginService);
  router = inject(Router);
  // toasterService = inject(ToastrService);

  ngOnInit() {
    if (this.loginService.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit() {
    // validiate email and password
    if (!this.email || !this.password) {
      return;
    }
    // if email and password is correct lets login the user
    this.loginService.login(this.email, this.password);
    // now we are logged in so we will redirect to our browse page
    this.router.navigateByUrl('/home');
  }
}
