import { Component, Input, OnInit } from '@angular/core';
import { LOGO_URL } from 'src/app/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() userImage: string = '';
  @Input() userName: string = '';

  logoUrl = LOGO_URL;

  constructor() {}

  ngOnInit(): void {
    if (!this.userImage || !this.userName) {
      console.error('userImage and userName inputs are required!');
    }
  }
}
